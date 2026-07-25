import request from "supertest";
import app from "../app.js";
import { connect, clearDatabase, closeDatabase } from "./db.js";

beforeAll(async () => await connect());
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
