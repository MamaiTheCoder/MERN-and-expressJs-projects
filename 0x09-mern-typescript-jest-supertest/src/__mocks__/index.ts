import { Request, Response } from 'express-serve-static-core';

export const mockRequest = {} as Request;

export const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res); // Mock status
    res.json = jest.fn().mockReturnValue(res); // Mock json
    return res as unknown as Response;
}