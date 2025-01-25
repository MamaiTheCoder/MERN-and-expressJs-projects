"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __mocks__1 = require("../__mocks__");
const user_controller_1 = require("../controllers/user.controller");
describe('GET /users', () => {
    it("should return a list of users", () => {
        (0, user_controller_1.getUsers)(__mocks__1.mockRequest, __mocks__1.mockResponse);
        expect(__mocks__1.mockResponse.send).toHaveBeenCalledWith([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ]);
    });
});
