"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __mocks__1 = require("../__mocks__");
const user_model_1 = require("../models/user.model");
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
describe("GET /users", () => {
    it("should return an empty array", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const res = (0, __mocks__1.mockResponse)(); // Create a mock response
        // Mock User.find() to return an object with select() method, then resolve to an empty array
        const mockFind = jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue([]), // Return empty array for the select method
        });
        const originalFind = user_model_1.User.find; // Save the original method
        user_model_1.User.find = mockFind; // Replace the original method with the mock
        // Act
        yield user_controllers_1.default.list(__mocks__1.mockRequest, res); // Call the controller's list function
        // Assert
        expect(res.status).toHaveBeenCalledWith(200); // Check if status was called with 200
        expect(res.json).toHaveBeenCalledWith([]); // Check if json was called with an empty array
        // Restore the original `User.find` after the test
        user_model_1.User.find = originalFind;
    }));
    it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const res = (0, __mocks__1.mockResponse)(); // Create a mock response
        // Mock User.find() to return an object with a select() method, then throw an error
        const mockFind = jest.fn().mockReturnValue({
            select: jest.fn().mockRejectedValue(new Error("Database error")), // Simulate error on select
        });
        const originalFind = user_model_1.User.find;
        user_model_1.User.find = mockFind; // Replace the original method with the mock
        // Act
        yield user_controllers_1.default.list(__mocks__1.mockRequest, res); // Call the controller's list function
        // Assert
        expect(res.status).toHaveBeenCalledWith(500); // Check if status was called with 500 (internal server error)
        expect(res.json).toHaveBeenCalledWith({
            error: "internal server error",
        }); // Check if the correct error response was sent
        // Restore the original `User.find` after the test
        user_model_1.User.find = originalFind;
    }));
});
