import type { UserDto, UserInputDto } from "./dto";
import { request } from "./http";

const BASE_URL = "http://localhost:3000/api";

export const usersApi = {
  getAll: () => request<UserDto[]>(`${BASE_URL}/users`),
  create: (data: UserInputDto) =>
    request<UserDto>(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getById: (id: string) => request<UserDto>(`${BASE_URL}/users/${id}`),
};
