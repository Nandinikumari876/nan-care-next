// Small helper to manage the logged-in patient's session in the browser.
// We store the JWT (issued after OTP verification) and their email in
// localStorage, so they stay logged in across visits until they log out.

const TOKEN_KEY = 'nanCarePatientToken';
const EMAIL_KEY = 'nanCarePatientEmail';

export function saveSession(token, email) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserEmail() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(EMAIL_KEY);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}