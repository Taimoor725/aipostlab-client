import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, password: password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  return response;
};

export const googleLogin = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error("Google login failed");
  }
  return response;
};

export const signup = async (
  fullName: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FullName: fullName,
      Email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
  }
  return response;
};

export const googleSignup = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/google-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error("Google signup failed");
  }
  return response;
};
