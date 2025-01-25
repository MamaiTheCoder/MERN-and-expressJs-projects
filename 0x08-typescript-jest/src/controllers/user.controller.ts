import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/createUser.Dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/response";

export function createUser(
    request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
    response: Response<User>
) {
    request.body.username


}

export const getUsers = (request: Request, response: Response): void => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    
    // Send the list of users as a response
    response.send(users);
  };