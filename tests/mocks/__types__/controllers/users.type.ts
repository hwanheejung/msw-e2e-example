import type { HttpResponseResolver } from "msw";
import type { UserDto, UserInputDto } from "@/shared/api/dto";

export type TUsersControllers = {
  getGetUsersUsersGet200Response: (
    info: Parameters<HttpResponseResolver<Record<string, never>, null>>[0]
  ) => UserDto[] | Promise<UserDto[]>;

  getCreateUserUsersPost201Response: (
    info: Parameters<
      HttpResponseResolver<Record<string, never>, UserInputDto>
    >[0]
  ) => UserDto | Promise<UserDto>;

  getCreateUserUsersPost400Response: (
    info: Parameters<
      HttpResponseResolver<Record<string, never>, UserInputDto>
    >[0]
  ) => null | Promise<null>;

  getGetUserUsersIdGet200Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, null>>[0]
  ) => UserDto | Promise<UserDto>;

  getGetUserUsersIdGet404Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, null>>[0]
  ) => null | Promise<null>;
};
