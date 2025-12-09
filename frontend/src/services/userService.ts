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

export interface User {
  id?: number;
  email: string;
  password?: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const createUser = async (data: User): Promise<User> => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

// UPDATE a user by id
export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  } catch (err: any) {
    console.error("Update user error", err.response?.data || err.message);
    throw err;
  }
};

// DELETE a user by id
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (err: any) {
    console.error("Delete user error", err.response?.data || err.message);
    throw err;
  }
};