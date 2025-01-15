import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchBrands = async () => {
  //get userid from cookies  (Cookies.set("userId",..)
  const userId = Cookies.get("userId");
  const response = await fetch(`${API_BASE_URL}/Brand/user/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }
  return response.json();
};

//const response = await fetch(`/api/ImageProxy/fetch-image?imageUrl=${encodeURIComponent(url)}`);
export const fetchImage = async (url: string) => {
  const response = await fetch(
    `${API_BASE_URL}/SocialCreative/fetch-image?imageUrl=${encodeURIComponent(
      url
    )}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch image from backend");
  }
  return response;
};

export const getDetailsByWebSite = async (url: string) => {
  const response = await fetch(
    `${API_BASE_URL}/Brand?url=${encodeURIComponent(url)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch brand data");
  }
  return response;
};

export const submitBrand = async (brand: any) => {
  const response = await fetch(`${API_BASE_URL}/Brand`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  });
  if (!response.ok) {
    throw new Error("Failed to submit brand");
  }
  return response;
};

export const fetchBrandById = async (brandId: string) => {
  const response = await fetch(`${API_BASE_URL}/Brand/${brandId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch brand by id");
  }
  return response.json();
};

export const updateBrand = async (brand: any) => {
  const response = await fetch(`${API_BASE_URL}/Brand/${brand.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  });
  if (!response.ok) {
    throw new Error("Failed to update brand");
  }
  return response;
};
