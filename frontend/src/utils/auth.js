// Store JWT token
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Get JWT token
export function getToken() {
  return localStorage.getItem("token");
}

// Remove JWT token
export function clearToken() {
  localStorage.removeItem("token");
}
