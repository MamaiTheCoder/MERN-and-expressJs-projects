"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
exports.createUser = createUser;
function createUser(request, response) {
    request.body.username;
}
const getUsers = (request, response) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    // Send the list of users as a response
    response.send(users);
};
exports.getUsers = getUsers;
