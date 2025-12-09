import axiosInstance from "../api/axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  id: number;
  email: string;
  token?: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/users/login", data);
    return response.data;
  } catch (err: any) {
    console.error("Login error", err.response?.data || err.message);
    throw err;
  }
};
