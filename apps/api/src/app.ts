import express from 'express';
import { auth } from './lib/auth';
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

const app = express();

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(async (req, res, next) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    // handle guard logic
    next();
});

export default app;
