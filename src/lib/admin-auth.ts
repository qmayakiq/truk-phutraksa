import { createHash, timingSafeEqual } from "crypto";

const ADMIN_COOKIE_NAME = "truk_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin1234";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

function buildToken() {
  return createHash("sha256")
    .update(`${getAdminPassword()}:${getSessionSecret()}`)
    .digest("hex");
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function isAdminAuthenticated(cookieValue?: string) {
  if (!cookieValue) return false;

  const expected = Buffer.from(buildToken(), "utf8");
  const actual = Buffer.from(cookieValue, "utf8");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

export function getAdminSessionToken() {
  return buildToken();
}
