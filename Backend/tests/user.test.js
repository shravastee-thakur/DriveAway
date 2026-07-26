import request from "supertest";
import app from "../app.js";
import { connect, clearDatabase, closeDatabase } from "./db.js";

beforeAll(async () => await connect());
//our afterEach() hook wipes the database clean after every single it() block
afterEach(async () => clearDatabase());
afterAll(async () => closeDatabase());

describe("POST /api/v1/user/register", () => {
  // Test 1: The Happy Path
  it("should successfully register a new user", async () => {
    const response = await request(app).post("/api/v1/user/register").send({
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      password: "123456",
    });

    // console.log("SERVER RESPONSE:", response.body); to test what went wrong

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user).not.toHaveProperty("password");
  });

  // Test 2: Sad Path - Duplicate User
  it("should fail if the email is already registered", async () => {
    // Step 1: Create the first user
    await request(app).post("/api/v1/user/register").send({
      name: "Original User",
      email: "duplicate@example.com",
      phoneNumber: "1112223333",
      password: "Password123!",
    });

    // Step 2: Try to create a second user with the exact same email
    const response = await request(app).post("/api/v1/user/register").send({
      name: "Copycat User",
      email: "duplicate@example.com",
      phoneNumber: "9998887777",
      password: "Password123!",
    });

    // We expect the 402 status code you wrote in your controller
    expect(response.status).toBe(402);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User already exists");
  });

  it("should fail if required fields are missing", async () => {
    const response = await request(app).post("/api/v1/user/register").send({
      name: "John Doe",
      phoneNumber: "1234567890",
    });
    expect(response.status).toBe(400);
  });
});

describe("POST /api/v1/user/login", () => {
  it("should successfully login existing user and set cookie", async () => {
    await request(app).post("/api/v1/user/register").send({
      name: "Original User",
      email: "duplicate@example.com",
      phoneNumber: "1112223333",
      password: "Password123!",
    });

    const response = await request(app).post("/api/v1/user/login").send({
      email: "duplicate@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.user.email).toBe("duplicate@example.com");

    //In Supertest, we can read this raw header by looking at response.headers["set-cookie"]. It returns an array of strings. We use .toMatch(/refreshToken/) (a simple Regular Expression) to verify that a cookie named refreshToken is actually inside that string. If this passes, you know your auth system works!

    // Check if the cookie was set successfully
    const cookies = response.headers["set-cookie"];
    expect(cookies).toBeDefined();

    // The cookie string should contain the name of your cookie
    expect(cookies[0]).toMatch(/refreshToken/);
  });

  it("should fail to login with incorrect password", async () => {
    await request(app).post("/api/v1/user/register").send({
      name: "Original User",
      email: "duplicate@example.com",
      phoneNumber: "1112223333",
      password: "123456",
    });

    const response = await request(app).post("/api/v1/user/login").send({
      email: "duplicate@example.com",
      password: "654123",
    });

    expect(response.status).not.toBe(200);
    expect(response.body.success).toBeFalsy();
  });

  it("should fail if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/v1/user/login")
      .send({ password: "123456" });

    expect(response.status).toBe(400);
  });
});

describe("POST /api/v1/user/refresh", () => {
  it("it should provide a new accessToken when provided a valid refresh cookie", async () => {
    const agent = request.agent(app);
    await agent.post("/api/v1/user/register").send({
      name: "Refresh Tester",
      email: "refresh@example.com",
      phoneNumber: "1234567890",
      password: "Password123!",
    });

    await agent.post("/api/v1/user/login").send({
      email: "refresh@example.com",
      password: "Password123!",
    });

    const refreshRes = await agent.post("/api/v1/user/refresh").send();

    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.success).toBe(true);
    expect(refreshRes.body).toHaveProperty("accessToken");
  });

  it("should fail with 401 if no refresh token cookie is provided", async () => {
    // We just hit the route directly without logging in or setting a cookie
    const response = await request(app).post("/api/v1/user/refresh").send();

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized: Invalid Token");
  });
});

describe("POST /api/v1/user/logout", () => {
  it("should successfully log out a user and clear the cookie", async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/user/register").send({
      name: "Logout Tester",
      email: "logout@example.com",
      phoneNumber: "1234567890",
      password: "Password123!",
    });

    const loginRes = await agent.post("/api/v1/user/login").send({
      email: "logout@example.com",
      password: "Password123!",
    });

    const accessToken = loginRes.body.accessToken;

    const logoutRes = await agent
      .post("/api/v1/user/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.success).toBe(true);
    expect(logoutRes.body.message).toBe("User logged out successfully");

    const cookies = logoutRes.headers["set-cookie"];
    expect(cookies).toBeDefined();

    expect(cookies[0]).toMatch(/refreshToken=;/);
  });

  it("should fail if no authorization header is provided", async () => {
    const response = await request(app).post("/api/v1/user/logout").send();

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized: No token provided");
  });

  it("should fail if an invalid token is provided", async () => {
    const response = await request(app)
      .post("/api/v1/user/logout")
      .set("Authorization", "Bearer fake_and_invalid_token_string")
      .send();

    // Expecting the token verification to fail
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized: Invalid token");
  });
});
