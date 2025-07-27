import express from 'express';
import { auth } from './lib/auth.js';
import { toNodeHandler } from "better-auth/node";
import { admin, adminRouter } from './lib/admin.js';

const app = express();

app.all('/api/auth/*', toNodeHandler(auth));
app.use(admin.options.rootPath, adminRouter);
console.log(`AdminJS is running under ${admin.options.rootPath}`);

export default app;
