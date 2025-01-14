import e from "express";

import { getMe, login, logout, signup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = e.Router();

router.get('/me', protectRoute, getMe);

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;