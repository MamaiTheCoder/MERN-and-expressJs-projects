"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
exports.mockRequest = {};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // Mock status
    res.json = jest.fn().mockReturnValue(res); // Mock json
    return res;
};
exports.mockResponse = mockResponse;
