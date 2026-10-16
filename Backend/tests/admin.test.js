import request from "supertest";
import app from "../app.js";
import { connect, clearDatabase, closeDatabase } from "./db.js";
import User from "../models/userModel.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Admin API Routes", () => {
  let adminToken;
  let adminId;
  let regularUserId;
  let regularUserToken;

  beforeEach(async () => {
    const agent = request.agent(app);

    const adminRes = await agent.post("/api/v1/user/register").send({
      name: "Admin User",
      email: "admin@example.com",
      phoneNumber: "1111111111",
      password: "Password123!",
      role: "admin",
    });

    const adminLogin = await agent.post("/api/v1/user/login").send({
      email: "admin@example.com",
      password: "Password123!",
    });
    adminToken = adminLogin.body.accessToken;

    // We need the admin's MongoDB _id to test the "delete yourself" logic
    const adminDbUser = await User.findOne({ email: "admin@example.com" });
    adminId = adminDbUser._id;

    // Seed a Regular User for the admin to delete
    await agent.post("/api/v1/user/register").send({
      name: "Regular User",
      email: "user@example.com",
      phoneNumber: "2222222222",
      password: "Password123!",
      role: "user",
    });

    const regularLogin = await agent.post("/api/v1/user/login").send({
      email: "user@example.com",
      password: "Password123!",
    });
    regularUserToken = regularLogin.body.accessToken;

    const regularDbUser = await User.findOne({ email: "user@example.com" });
    regularUserId = regularDbUser._id;
  });

  describe("GET /api/v1/admin/getAllUsers", () => {
    it("should fetch all users for an admin", async () => {
      const response = await request(app)
        .get("/api/v1/admin/getAllUsers")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // 2 users (Admin + Regular User)
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);

      // Verify passwords are NOT returned
      expect(response.body.data[0]).not.toHaveProperty("password");
    });

    it("should block a regular user from fetching all users", async () => {
      const response = await request(app)
        .get("/api/v1/admin/getAllUsers")
        .set("Authorization", `Bearer ${regularUserToken}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "Access denied: insufficient permissions",
      );
    });
  });

  describe("DELETE /api/v1/admin/deleteUser/:id", () => {
    it("should allow an admin to delete another user", async () => {
      const response = await request(app)
        .delete(`/api/v1/admin/deleteUser/${regularUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");

      // Verify they are actually gone from the database
      const checkDb = await User.findById(regularUserId);
      expect(checkDb).toBeNull();
    });

    it("should prevent an admin from deleting themselves", async () => {
      const response = await request(app)
        .delete(`/api/v1/admin/deleteUser/${adminId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("You cannot delete yourself");
    });

    it("should return 404 if the user ID does not exist", async () => {
      const fakeId = "6a648e993b51bd6f3f1eeb9e"; // Valid format, fake ID

      const response = await request(app)
        .delete(`/api/v1/admin/deleteUser/${fakeId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });
});
