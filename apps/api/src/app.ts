import "express-async-errors"; // For Express 4.x Error Handling
import express from "express";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { admin, adminRouter } from "./lib/admin.js";
import api from "./routes/index.js";
const app = express();

app.disable("x-powered-by");

app.all("/api/auth/*", toNodeHandler(auth));
app.use(admin.options.rootPath, adminRouter);
console.log(`AdminJS is running under ${admin.options.rootPath}`);
app.use("/api", api);

export default app;
