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

interface User {
  id?: number;        // opcional para create
  email: string;
  password?: string;  // opcional para update si no quieres cambiarla
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

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (err: any) {
    console.error("Get users error", err.response?.data || err.message);
    throw err;
  }
};

// CREATE a new user
export const createUser = async (data: User): Promise<User> => {
  try {
    const response = await axiosInstance.post("/users", data);
    return response.data;
  } catch (err: any) {
    console.error("Create user error", err.response?.data || err.message);
    throw err;
  }
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