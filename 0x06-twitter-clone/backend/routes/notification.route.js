import e from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import { getNotifications, deleteNotification } from "../controllers/notification.controller.js";


const router = e.Router();

router.get('/', protectRoute, getNotifications);

router.delete('/', protectRoute, deleteNotification);

export default router;