import { RequestHandler } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { Session, User } from "better-auth";

declare global {
  namespace Express {
    interface Request {
      session?: Session;
      user?: User;
    }
  }
}

export const requireAuth: RequestHandler = async (req, res, next) => {
  const data = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!data) {
    throw new Error("Unauthorized");
  }
  req.user = data.user;
  req.session = data.session;
  next();
};
