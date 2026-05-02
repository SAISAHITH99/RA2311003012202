import { Request, Response } from "express";
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
import { Notification, CreateNotificationDto } from "../types/notification";
import { Log } from "../middleware/logger";

// In-memory storage for notifications
let notifications: Notification[] = [];

// Get all notifications
export const getNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Log("backend", "info", "controller", 
      "Fetching all notifications");
    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    await Log("backend", "error", "controller", 
      "Failed to fetch notifications");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create notification
export const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, message, type }: CreateNotificationDto = req.body;

    // Validate request body
    if (!title || !message || !type) {
      await Log("backend", "warn", "controller", 
        "Missing required fields in create notification request");
      res.status(400).json({
        success: false,
        message: "Title, message and type are required",
      });
      return;
    }

    const newNotification: Notification = {
      id: generateId(),
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date(),
    };

    notifications.push(newNotification);

    await Log("backend", "info", "controller", 
      `Notification created successfully with id: ${newNotification.id}`);

    res.status(201).json({
      success: true,
      data: newNotification,
    });
  } catch (error) {
    await Log("backend", "error", "controller", 
      "Failed to create notification");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Mark notification as read
export const markAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const notification = notifications.find((n) => n.id === id);

    if (!notification) {
      await Log("backend", "warn", "controller", 
        `Notification not found with id: ${id}`);
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    notification.isRead = true;

    await Log("backend", "info", "controller", 
      `Notification marked as read with id: ${id}`);

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    await Log("backend", "error", "controller", 
      "Failed to mark notification as read");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete notification
export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const index = notifications.findIndex((n) => n.id === id);

    if (index === -1) {
      await Log("backend", "warn", "controller", 
        `Notification not found for deletion with id: ${id}`);
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    notifications.splice(index, 1);

    await Log("backend", "info", "controller", 
      `Notification deleted successfully with id: ${id}`);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    await Log("backend", "error", "controller", 
      "Failed to delete notification");
    res.status(500).json({ success: false, message: "Server error" });
  }
};