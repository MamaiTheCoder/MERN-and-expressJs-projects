import { mockRequest, mockResponse } from "../__mocks__";

import { User } from "../models/user.model";
import userCtrl from "../controllers/user.controllers";

describe("GET /users", () => {
  it("should return an empty array", async () => {
    // Arrange
    const res = mockResponse(); // Create a mock response

    // Mock User.find() to return an object with select() method, then resolve to an empty array
    const mockFind = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([]), // Return empty array for the select method
    });

    const originalFind = User.find; // Save the original method
    User.find = mockFind; // Replace the original method with the mock

    // Act
    await userCtrl.list(mockRequest, res); // Call the controller's list function

    // Assert
    expect(res.status).toHaveBeenCalledWith(200); // Check if status was called with 200
    expect(res.json).toHaveBeenCalledWith([]); // Check if json was called with an empty array

    // Restore the original `User.find` after the test
    User.find = originalFind;
  });
  it("should return 500 if an error occurs", async () => {
    // Arrange
    const res = mockResponse(); // Create a mock response

    // Mock User.find() to return an object with a select() method, then throw an error
    const mockFind = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error("Database error")), // Simulate error on select
    });

    const originalFind = User.find;
    User.find = mockFind; // Replace the original method with the mock

    // Act
    await userCtrl.list(mockRequest, res); // Call the controller's list function

    // Assert
    expect(res.status).toHaveBeenCalledWith(500); // Check if status was called with 500 (internal server error)
    expect(res.json).toHaveBeenCalledWith({
      error: "internal server error",
    }); // Check if the correct error response was sent

    // Restore the original `User.find` after the test
    User.find = originalFind;
  });
});
