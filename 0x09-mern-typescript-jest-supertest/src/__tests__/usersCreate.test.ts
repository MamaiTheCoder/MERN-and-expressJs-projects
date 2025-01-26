import { Request, Response } from 'express-serve-static-core';

import { mockResponse } from "../__mocks__";

import { User } from "../models/user.model";
import userCtrl from "../controllers/user.controllers";
import { CreateUserRequestBody } from "../types/request";


describe('POST /users', () => {
  const mockRequest = (body: CreateUserRequestBody) => ({ body } as Request<{}, {}, CreateUserRequestBody>); // Correctly type the request

  it('should return 201 when a user is successfully created', async () => {
    // Arrange
    const requestBody = {
      name: ' a b',
      email: 'a@acom',
      password: 'password123',
    }; // Example user data

    const res = mockResponse(); // Create a mock response
    const mockSave = jest.fn().mockResolvedValue({}); // Mock `save()` to resolve successfully
    const originalSave = User.prototype.save; // Save the original `save` method
    User.prototype.save = mockSave; // Replace `save` with our mock

    // Act
    await userCtrl.create(mockRequest(requestBody), res); // Call the controller's create function

    // Assert
    expect(res.status).toHaveBeenCalledWith(201); // Ensure the status is 201
    expect(res.json).toHaveBeenCalledWith({
      message: 'Successfully signed up!', // Check if success message is returned
    });

    // Restore the original `save` after the test
    User.prototype.save = originalSave;
  });

  it('should return 500 if an error occurs while creating a user', async () => {
    // Arrange
    const requestBody = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }; // Example user data

    const res = mockResponse(); // Create a mock response
    const mockSave = jest.fn().mockRejectedValue(new Error('Database error')); // Simulate error in save
    const originalSave = User.prototype.save; // Save the original `save` method
    User.prototype.save = mockSave; // Replace `save` with our mock

    // Act
    await userCtrl.create(mockRequest(requestBody), res); // Call the controller's create function

    // Assert
    expect(res.status).toHaveBeenCalledWith(500); // Ensure the status is 500 for internal server error
    expect(res.json).toHaveBeenCalledWith({
      error: 'internal server error', // Check if the correct error message is returned
    });

    // Restore the original `save` after the test
    User.prototype.save = originalSave;
  });
});
