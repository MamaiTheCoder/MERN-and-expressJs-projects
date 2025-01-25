import request from "supertest";
import { type Express } from 'express-serve-static-core'
import { createApp } from "../CreateApp";

describe('GET /api/users', () => {
    let app: Express

    beforeAll(() => {
        app = createApp();
    })

    it('should return an empty arry', async () => {
        const response = await request(app).get("/api/users");
        expect(response.body).toStrictEqual({})
    })
})