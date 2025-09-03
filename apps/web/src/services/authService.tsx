import { authClient } from "../lib/auth-client";

async function login(email: string, password: string) {
  try {
    const res = await authClient.signIn.email({ email, password });
    console.log("Logged in user:", res);
    return res;
  } catch (err) {
    console.error("Login failed:", err);
  }
}

async function register(
  name: string,
  email: string,
  password: string,
  discordUsername: string,
  trackId: string,
) {
  try {
    const res = await authClient.signUp.email({
      name,
      email,
      password,
      discordUsername,
      trackId,
    });
    console.log("Registered user:", res);
    return res;
  } catch (err) {
    console.error("Registration failed:", err);
  }
}
async function getProfile() {
  try {
    const res = await authClient.getSession();
    console.log("User profile:", res);
    return res;
  } catch (err) {
    console.error("Fetch user failed:", err);
  }
}

export { login, register, getProfile };
