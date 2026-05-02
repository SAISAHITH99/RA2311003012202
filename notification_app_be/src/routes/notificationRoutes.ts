import { Router } from "express";
import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController";

const router = Router();

// GET all notifications
router.get("/", getNotifications);

// POST create notification
router.post("/", createNotification);

// PATCH mark as read
router.patch("/:id/read", markAsRead);

// DELETE notification
router.delete("/:id", deleteNotification);

export default router;