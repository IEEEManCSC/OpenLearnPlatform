import "express-async-errors"; // For Express 4.x Error Handling
import express from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { router, ROUTES_PREFIX } from "./router.js";
import { addEnhancedSendMethod } from "./middlewares/enhanced-send.js";

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://olp.csc.ieeemansb.org"],
    credentials: true,
  }),
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use(addEnhancedSendMethod);

app.use(ROUTES_PREFIX, router);

export default app;
