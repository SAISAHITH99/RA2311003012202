import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notificationRoutes from "./routes/notificationRoutes";
import { Log } from "./middleware/logger";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use(async (req, res, next) => {
  await Log("backend", "info", "middleware",
    `${req.method} ${req.path} request received`);
  next();
});

// Routes
app.use("/api/notifications", notificationRoutes);

// Health check route
app.get("/health", async (req, res) => {
  await Log("backend", "info", "route", "Health check passed");
  res.status(200).json({ status: "ok" });
});

// Start server
app.listen(PORT, async () => {
  await Log("backend", "info", "config",
    `Server started successfully on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});