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
describe('POST /users', () => {
    const mockRequest = (body) => ({ body }); // Correctly type the request
    it('should return 201 when a user is successfully created', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const requestBody = {
            name: ' a b',
            email: 'a@acom',
            password: 'password123',
        }; // Example user data
        const res = (0, __mocks__1.mockResponse)(); // Create a mock response
        const mockSave = jest.fn().mockResolvedValue({}); // Mock `save()` to resolve successfully
        const originalSave = user_model_1.User.prototype.save; // Save the original `save` method
        user_model_1.User.prototype.save = mockSave; // Replace `save` with our mock
        // Act
        yield user_controllers_1.default.create(mockRequest(requestBody), res); // Call the controller's create function
        // Assert
        expect(res.status).toHaveBeenCalledWith(201); // Ensure the status is 201
        expect(res.json).toHaveBeenCalledWith({
            message: 'Successfully signed up!', // Check if success message is returned
        });
        // Restore the original `save` after the test
        user_model_1.User.prototype.save = originalSave;
    }));
    it('should return 500 if an error occurs while creating a user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const requestBody = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        }; // Example user data
        const res = (0, __mocks__1.mockResponse)(); // Create a mock response
        const mockSave = jest.fn().mockRejectedValue(new Error('Database error')); // Simulate error in save
        const originalSave = user_model_1.User.prototype.save; // Save the original `save` method
        user_model_1.User.prototype.save = mockSave; // Replace `save` with our mock
        // Act
        yield user_controllers_1.default.create(mockRequest(requestBody), res); // Call the controller's create function
        // Assert
        expect(res.status).toHaveBeenCalledWith(500); // Ensure the status is 500 for internal server error
        expect(res.json).toHaveBeenCalledWith({
            error: 'internal server error', // Check if the correct error message is returned
        });
        // Restore the original `save` after the test
        user_model_1.User.prototype.save = originalSave;
    }));
});
