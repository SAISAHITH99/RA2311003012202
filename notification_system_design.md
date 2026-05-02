# Notification System Design

## Overview
A full stack notification system with REST API backend 
and React frontend.

## Architecture
- Frontend: React + TypeScript
- Backend: Node.js + Express + TypeScript
- Logging: Custom middleware sending logs to Affordmed server

## Backend API Endpoints
- GET /api/notifications - Get all notifications
- POST /api/notifications - Create notification
- PATCH /api/notifications/:id/read - Mark as read
- DELETE /api/notifications/:id - Delete notification

## Logging Strategy
Logs are sent to Affordmed test server at every:
- Server startup
- API request received
- Successful operations
- Warnings and errors

## Data Flow
1. Frontend sends request to Backend
2. Backend processes request
3. Backend logs the operation
4. Backend returns response to Frontend
5. Frontend displays the notification