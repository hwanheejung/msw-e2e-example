import usersControllers from "./user";
import type { TControllers } from "../__types__/controllers";

export const controllers: TControllers = {
  ...usersControllers,
};
