import request from "supertest";
import { app } from "../src/setting";
import dotenv from "dotenv";
dotenv.config();

describe("/videos", () => {
  beforeAll(async () => {
    // await request(app).delete("/testing/all-data").expect(204);
  });

  it("GET products = []", async () => {
    await request(app).get("/videos/").expect([]);
  });
});
