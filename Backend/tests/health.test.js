import request from "supertest";
import app from "../app";

describe("Health API", () => {
  it("returns 200 and a healthy message", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("API is healthy");
  });
});
