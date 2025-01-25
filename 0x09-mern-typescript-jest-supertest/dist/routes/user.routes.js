"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const router = express_1.default.Router();
router.route('/users')
    .get(user_controllers_1.default.list)
    .post(user_controllers_1.default.create);
router.route('/users/:userId')
    .get(user_controllers_1.default.read)
    .put(user_controllers_1.default.update)
    .delete(user_controllers_1.default.remove);
router.param('userId', user_controllers_1.default.userByID);
exports.default = router;
