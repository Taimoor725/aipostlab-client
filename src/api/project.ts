const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const GenerateSocialProject = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/SocialCreative`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to generate social project");
  }
  return response.json();
};

export const getSocialTemplates = async () => {
  return fetch(`${API_BASE_URL}/SocialCreative/templates`, {
    method: "GET",
    credentials: "include",
  });
};

export const getContentData = async (id: string) => {
  return fetch(`${API_BASE_URL}/SocialCreative/${id}`, {
    method: "GET",
    credentials: "include",
  });
};

export const getGeneratedProject = async (id: string) => {
  return fetch(`${API_BASE_URL}/SocialCreative/${id}/project`, {
    method: "GET",
    credentials: "include",
  });
};

//by brandid
export const getGeneratedProjectList = async (brandId: string) => {
  return fetch(`${API_BASE_URL}/Project/project-list/${brandId}`, {
    method: "GET",
    credentials: "include",
  });
};

//improve the headline
export const improveHeadline = async (headline: string) => {
  return fetch(`${API_BASE_URL}/SocialCreative/improve-headline`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ headline }),
  });
};

//improve the punchline
export const improvePunchline = async (punchline: string) => {
  return fetch(`${API_BASE_URL}/SocialCreative/improve-punchline`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ punchline }),
  });
};

//improve the call to action
export const improveCallToAction = async (callToAction: string) => {
  return fetch(`${API_BASE_URL}/SocialCreative/improve-call-to-action`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ callToAction }),
  });
};
