import { request } from "supertest";
import app from "../../server.js";
import db from "../../db.js";
import bcrypt from "bcrypt";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  vitest,
  it,
  afterAll,
} from "vitest";

// Helper functions to help set up and clean test data
const setUpTestData = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  await db.query(
    "INSERT INTO test_users (first_name,last_name,username,password,email) VALUES ($1,$2,$3,$4,$5);",
    ["john", "doe", "johnDoe1", hashedPassword, "johndoe@icloud.com"]
  );
};

const cleanUpTestData = async () => {
  await db.query("DELETE FROM test_users;");
};

// initualize setup and clean up before each test
let server;

beforeAll((done) => {
  server = app.listen(8081, done); // Start server
});

afterAll((done) => {
  server.close(done); // Close server
});
beforeEach(async () => {
  try {
    await setUpTestData();
  } catch (error) {
    console.log(`error setting up test data: ${error}`);
  }
});

afterEach(async () => {
  try {
    await cleanUpTestData();
  } catch (error) {
    console.log(`error cleaning up test data: ${error}`);
  }
});

describe("POST /register", async () => {
  // arrange
  const user = {
    email: "test@example.com",
    password: "password",
    first_name: "Mary",
    last_name: "Jane",
    username: "MaryJane1",
  };
  //   act
  it("should correctly insert a new user in the database and send down an access and refresh token", async () => {
    const response = await request(app).post("/api/users/register").send(user);

    //   assert
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user succesfully created");
    expect(response.body.accessToken).toBeTruthy();
    expect(response.headers["set-cookie"][0]).toMatch(/refreshToken=.+;/);
  });
});
