import "../env.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { auth } from "./auth.js";

const authenticate = async (email: string, password: string) => {
  const res = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  return res.user;
};

const admin = new AdminJS({
  resources: [],
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookiePassword: "supersecretpassword",
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
  },
);

export { admin, adminRouter };
