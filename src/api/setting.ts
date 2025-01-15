const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const changeFullName = async (fullName: string) => {
  return fetch(`${API_BASE_URL}/setting/fullName`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
    }),
  });
};

export const changeEmail = async (email: string) => {
  return fetch(`${API_BASE_URL}/setting/email`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};

export const changePassword = async (newPassword: string) => {
  return fetch(`${API_BASE_URL}/setting/password`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newPassword,
    }),
  });
};
