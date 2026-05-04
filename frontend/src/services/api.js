import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export const predictDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await axios.post(
    `${API_BASE_URL}/predict`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
