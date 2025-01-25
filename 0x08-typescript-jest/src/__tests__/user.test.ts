import { mockRequest, mockResponse } from "../__mocks__";
import { getUsers } from "../controllers/user.controller";

describe('GET /users', () => {
    it("should return a list of users", () => {
        getUsers(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ])
    })
})