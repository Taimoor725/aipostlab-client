const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const GetStyles = async (type: string) => {
  return fetch(`${API_BASE_URL}/ProductCreative/preset-styles/${type}`, {
    method: "GET",
    credentials: "include",
  });
};

export const GenerateProduct = async (
  projectName: string,
  selectedStyleIds: number[],
  backgroundImage: string,
  userId: string,
  brandId: number
) => {
  const response = await fetch(`${API_BASE_URL}/ProductCreative`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectName,
      selectedStyleIds,
      backgroundImage,
      userId,
      brandId,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to generate product");
  }
  return response;
};

export const getGeneratedProducts = async (projectId: string) => {
  return fetch(`${API_BASE_URL}/ProductCreative/product/${projectId}`, {
    method: "GET",
    credentials: "include",
  });
};
