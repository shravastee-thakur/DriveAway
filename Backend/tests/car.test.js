// We are going to use a Jest feature called Mocking. We will tell Jest: "Hey, whenever Express tries to talk to Cloudinary, intercept the call. Don't actually send the image. Just pretend it worked and immediately hand Express a fake URL like [https://fake.url/image.png](https://fake.url/image.png)."

import request from "supertest";
import app from "../app.js";
import { connect, clearDatabase, closeDatabase } from "./db.js";
import { jest } from "@jest/globals";
import { v2 as cloudinary } from "cloudinary";

// 1. Intercept the upload to prevent network calls
jest
  .spyOn(cloudinary.uploader, "upload_stream")
  .mockImplementation((options, callback) => {
    callback(null, { secure_url: "https://fake-cloudinary.com/car.jpg" });
    return { end: jest.fn() };
  });

// 2. Intercept the config so it doesn't crash if .env keys are missing
jest.spyOn(cloudinary, "config").mockImplementation(() => {});

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => {
  await closeDatabase();
  jest.restoreAllMocks();
});

describe("Car API Routes", () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    const agent = request.agent(app);

    // 1. Seed an Admin User
    await agent.post("/api/v1/user/register").send({
      name: "Admin User",
      email: "admin@example.com",
      phoneNumber: "1234567890",
      password: "Password123!",
      role: "admin",
    });

    const adminRes = await agent.post("/api/v1/user/login").send({
      email: "admin@example.com",
      password: "Password123!",
    });
    adminToken = adminRes.body.accessToken;

    // 2. Seed a Regular User
    await agent.post("/api/v1/user/register").send({
      name: "Regular User",
      email: "user@example.com",
      phoneNumber: "0987654321",
      password: "Password123!",
      role: "user",
    });

    const regularRes = await agent.post("/api/v1/user/login").send({
      email: "user@example.com",
      password: "Password123!",
    });

    userToken = regularRes.body.accessToken;
  });

  describe("POST /api/v1/car/createCar", () => {
    it("should successfully create a car and return the mocked image URL", async () => {
      const response = await request(app)
        .post("/api/v1/car/createCar")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("modelName", "Tesla Model")
        .field("pricePerDay", "100")
        .field("seatCapacity", "5")
        .field("fuelType", "Electric")
        .field("type", "Sedan")
        .field("transmission", "Automatic")
        .field("isAvailable", "true")
        .attach("carImage", Buffer.from("fake_image_data"), "tesla.jpg");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.car.carImage).toBe(
        "https://fake-cloudinary.com/car.jpg",
      );
    });

    it("should return 403 if a regular user tries to create a car", async () => {
      const response = await request(app)
        .post("/api/v1/car/createCar")
        .set("Authorization", `Bearer ${userToken}`)
        .field("modelName", "Honda Civic")
        .attach("carImage", Buffer.from("fake_image"), "honda.jpg");

      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "Access denied: insufficient permissions",
      );
    });

    it("should return 400 if the car image is missing", async () => {
      const response = await request(app)
        .post("/api/v1/car/createCar")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("modelName", "Ford Mustang");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Car image is required");
    });
  });
});
