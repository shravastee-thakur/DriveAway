import request from "supertest";
import app from "../app.js";
import { connect, clearDatabase, closeDatabase } from "./db.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Booking API Routes", () => {
  let adminToken;
  let user1Token;
  let user2Token; // We need a second user to test unauthorized deletion
  let testCar;

  beforeEach(async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/user/register").send({
      name: "Admin User",
      email: "admin@example.com",
      phoneNumber: "1111111111",
      password: "Password123!",
      role: "admin",
    });

    const adminRes = await agent.post("/api/v1/user/login").send({
      email: "admin@example.com",
      password: "Password123!",
    });
    adminToken = adminRes.body.accessToken;

    // Seed User 1
    await agent.post("/api/v1/user/register").send({
      name: "User One",
      email: "user1@example.com",
      phoneNumber: "2222222222",
      password: "Password123!",
      role: "user",
    });

    const user1Res = await agent.post("/api/v1/user/login").send({
      email: "user1@example.com",
      password: "Password123!",
    });
    user1Token = user1Res.body.accessToken;

    // Seed User 2
    await agent.post("/api/v1/user/register").send({
      name: "User Two",
      email: "user2@example.com",
      phoneNumber: "3333333333",
      password: "Password123!",
      role: "user",
    });

    const user2Res = await agent.post("/api/v1/user/login").send({
      email: "user2@example.com",
      password: "Password123!",
    });
    user2Token = user2Res.body.accessToken;

    testCar = await Car.create({
      modelName: "Test Car",
      pricePerDay: 100,
      seatCapacity: 4,
      fuelType: "Petrol",
      type: "Sedan",
      transmission: "Automatic",
      carImage: "https://fake.url/car.jpg",
      owner: "6a648e993b51bd6f3f1eeb9e",
    });
  });

  describe("POST /api/v1/booking/createBooking", () => {
    it("should create a booking, calculate correct price, and update the Car", async () => {
      const response = await request(app)
        .post("/api/v1/booking/createBooking")
        .set("Authorization", `Bearer ${user1Token}`)
        .send({
          car: testCar._id,
          startDate: "2026-08-01",
          endDate: "2026-08-03", // 3 days (1st, 2nd, 3rd)
          pickupLocation: "Airport",
          dropLocation: "Downtown",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      expect(response.body.data.totalPrice).toBe(300);
    });
  });

  describe("GET /api/v1/booking/myBooking", () => {
    it("should only return bookings belonging to the logged-in user", async () => {
      const setup1 = await request(app)
        .post("/api/v1/booking/createBooking")
        .set("Authorization", `Bearer ${user1Token}`)
        .send({
          car: testCar._id,
          startDate: "2026-08-01",
          endDate: "2026-08-02",
          pickupLocation: "Airport",
          dropLocation: "Downtown",
        });

      expect(setup1.status).toBe(200);
      expect(setup1.body.success).toBe(true);

      // Inject a booking for User 2 (different car to avoid overlap logic)
      const testCar2 = await Car.create({
        modelName: "Another Car",
        pricePerDay: 50,
        seatCapacity: 2,
        fuelType: "EV",
        type: "Hatchback",
        transmission: "Automatic",
        carImage: "url",
        owner: "6a648e993b51bd6f3f1eeb9e",
      });

      const setup2 = await request(app)
        .post("/api/v1/booking/createBooking")
        .set("Authorization", `Bearer ${user2Token}`)
        .send({
          car: testCar2._id,
          startDate: "2026-08-01",
          endDate: "2026-08-02",
          pickupLocation: "Airport",
          dropLocation: "Downtown",
        });

      expect(setup2.status).toBe(200);
      expect(setup2.body.success).toBe(true);

      const response = await request(app)
        .get("/api/v1/booking/myBooking")
        .set("Authorization", `Bearer ${user1Token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].car.modelName).toBe("Test Car");
    });
  });

  describe("DELETE /api/v1/booking/deleteBooking/:id", () => {
    let bookingId;

    beforeEach(async () => {
      // Create a booking owned by User 1 before each delete test
      const res = await request(app)
        .post("/api/v1/booking/createBooking")
        .set("Authorization", `Bearer ${user1Token}`)
        .send({
          car: testCar._id,
          startDate: "2026-08-01",
          endDate: "2026-08-02",
          pickupLocation: "A",
          dropLocation: "B",
        });
      bookingId = res.body.data._id;
    });

    it("should allow a user to delete their OWN booking", async () => {
      const response = await request(app)
        .delete(`/api/v1/booking/deleteBooking/${bookingId}`)
        .set("Authorization", `Bearer ${user1Token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Booking deleted successfully");
    });

    it("should PREVENT User 2 from deleting User 1's booking", async () => {
      const response = await request(app)
        .delete(`/api/v1/booking/deleteBooking/${bookingId}`)
        .set("Authorization", `Bearer ${user2Token}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Not authorized");
    });

    it("should allow an ADMIN to delete User 1's booking", async () => {
      const response = await request(app)
        .delete(`/api/v1/booking/deleteBooking/${bookingId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Booking deleted successfully");
    });
  });
});
