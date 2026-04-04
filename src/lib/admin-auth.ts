import { createHash, timingSafeEqual } from "crypto";

const ADMIN_COOKIE_NAME = "truk_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

function getSessionSecret() {
  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return null;
  }

  return process.env.ADMIN_SESSION_SECRET || adminPassword;
}

function buildToken() {
  const adminPassword = getAdminPassword();
  const sessionSecret = getSessionSecret();

  if (!adminPassword || !sessionSecret) {
    return null;
  }

  return createHash("sha256")
    .update(`${adminPassword}:${sessionSecret}`)
    .digest("hex");
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}

export function isAdminAuthenticated(cookieValue?: string) {
  if (!cookieValue) return false;

  const token = buildToken();
  if (!token) {
    return false;
  }

  const expected = Buffer.from(token, "utf8");
  const actual = Buffer.from(cookieValue, "utf8");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

export function getAdminSessionToken() {
  return buildToken();
}
