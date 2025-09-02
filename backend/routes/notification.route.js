import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    getNotifications, 
    markAsRead, 
    markAllAsRead, 
    getUnreadCount 
} from "../controllers/notification.controller.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getNotifications);
router.route("/unread-count").get(isAuthenticated, getUnreadCount);
router.route("/mark-all-read").put(isAuthenticated, markAllAsRead);
router.route("/:notificationId/mark-read").put(isAuthenticated, markAsRead);

export default router;
