// Logging Middleware - Reusable Package
// Sends structured logs to the Affordmed Test Server

type Stack = "backend" | "frontend";

type Level = "debug" | "info" | "warn" | "error" | "fatal";

type Package =
  | "cache" | "controller" | "cron_job" | "db" | "domain"
  | "handler" | "repository" | "route" | "service"
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils";

const LOG_API_URL = "http://20.207.122.201/evaluation-service/logs";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcDQwMjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDMyMiwiaWF0IjoxNzc3NzAzNDIyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYmIzYzgwMGEtZmJkZS00NTQ5LWI4MzUtNjMxZmIxZjkxN2QzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicGFsbGFudGxhIHNhaXNhaGl0aCIsInN1YiI6ImRkNWE1YjhlLTkwYjUtNDZiYy05MjVhLWIyZDBjZTkwMGEyMCJ9LCJlbWFpbCI6InBwNDAyNkBzcm1pc3QuZWR1LmluIiwibmFtZSI6InBhbGxhbnRsYSBzYWlzYWhpdGgiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTIyMDIiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJkZDVhNWI4ZS05MGI1LTQ2YmMtOTI1YS1iMmQwY2U5MDBhMjAiLCJjbGllbnRTZWNyZXQiOiJBRnBYc256UFBLTVljZktqIn0.Ivi3FCTDedhuvCn_mzrkwf-GieST-HXzcshNVwzpkFs";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    // Sending log to Affordmed Test Server
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Log successfully sent to server
      console.log(
        `[LOG SUCCESS] ${level.toUpperCase()} | ${pkg} | ${message}`
      );
      console.log(`Log ID: ${data.logID}`);
    } else {
      // Log failed to send
      console.error(`[LOG FAILED] Status: ${response.status}`, data);
    }
  } catch (error) {
    // Network or unexpected error
    console.error("[LOG ERROR] Failed to send log:", error);
  }
}