import {jwtDecode} from "jwt-decode";

// JWT helper utilities
// Purpose: centralise JWT decoding and expiry handling so callers can
// obtain a valid token and let this module remove expired tokens.

// Return the stored full auth token (organisation admin token)
export const getToken = () => localStorage.getItem("token");

// Return the stored temporary visitor token
export const getTempToken = () => localStorage.getItem("tempToken");

// Convenience: prefer full token, else return temp token
export const getActiveToken = () => getToken() || getTempToken();

// Decode a JWT payload using `jwt-decode`.
// Returns the decoded payload or null for invalid tokens.
export function getTokenPayload(token) {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    // Bad token format or decode failure — treat as invalid
    console.log(error)
    return null;
  }
}

// Checks `exp` in the decoded payload against current time.
// Returns `true` when the token is expired or the payload is invalid.
export function isTokenExpired(token) {
  const payload = getTokenPayload(token);
  if (!payload || typeof payload.exp !== "number") {
    return true;
  }

  return Date.now() >= payload.exp * 1000;
}

// Remove any tokens in localStorage that are expired.
// Call this before making protected requests to avoid sending
// stale tokens to the backend.
export function clearExpiredTokens() {
  const storedToken = getToken();
  const storedTempToken = getTempToken();

  if (storedToken && isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
  }

  if (storedTempToken && isTokenExpired(storedTempToken)) {
    localStorage.removeItem("tempToken");
  }
}

// Public helper used before protected requests.
// It clears expired tokens and then returns the first available token.
export function getValidAuthToken() {
  clearExpiredTokens();
  return getToken() || getTempToken();
}
