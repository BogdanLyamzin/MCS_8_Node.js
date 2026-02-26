import request from "supertest";

import app from "../server.js";
import connectDatabase from "../db/connectDatabase.js";

import User from "../db/models/User.js";

import { findUser, registerUser } from "../services/authServices.js";

describe("test /api/auth/login", ()=> {
    let server = null;
    beforeAll(async ()=> {
        await connectDatabase();
        const port = Number(process.env.PORT) || 3000;
        server = app.listen(port, ()=> console.log(`Server running on ${port} port`));
    });

    afterAll(()=> {
        server.close();
    })

    afterEach(async ()=> {
        User.destroy();
    })

    test("test login with correct credentials", async()=> {
        const registerData = {
            username: "testuser",
            email: "test@gmail.com",
            password: "123456"
        };

        await registerUser(registerData);

        const loginData = {
            email: "test@gmail.com",
            password: "123456"
        }

        const {status, body} = await request(app).post("/api/auth/login").send(loginData);
        expect(status).toBe(200);
        expect(body.username).toBe(registerData.username);
        expect(body.email).toBe(registerData.email);
        expect(body).toHaveProperty("token");

        const userFromDb = await findUser({email: registerData.email});
        expect(userFromDb.email).toBe(body.email);
    })
})