// import type { SignupFormData, AuthResponse } from "../types/auth.types";
import axios from "axios";
// import { SignupFormData, AuthResponse } from "../types/auth.types";
import type { SignupFormData, AuthResponse } from "../types/auth.types";


const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const signup = async (data: SignupFormData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const getMe = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export default api;