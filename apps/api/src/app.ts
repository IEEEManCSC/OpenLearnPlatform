import "express-async-errors"; // For Express 4.x Error Handling
import express from "express";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { admin, adminRouter } from "./lib/admin.js";
import { quizzesRouter } from "./routes/quizzes.js";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");

app.all("/api/auth/*", toNodeHandler(auth));
app.use(admin.options.rootPath, adminRouter);
console.log(`AdminJS is running under ${admin.options.rootPath}`);

// API routes
app.use("/api/quizzes", quizzesRouter);

// Simple health route
app.get("/api/health", (_req: express.Request, res: express.Response): void => {
  res.json({ status: "ok" });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  console.error("[Error]", err);
  if (err?.message === "Unauthorized") {
    res.status(401).json({ status: "fail", message: "Unauthorized" });
    return;
  }
  res
    .status(500)
    .json({ status: "error", message: err?.message || "Server error" });
}) as express.ErrorRequestHandler);

export default app;
