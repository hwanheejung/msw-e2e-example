import type { TUsersControllers } from "../__types__/controllers/users.type";

const userControllers: Partial<TUsersControllers> = {
  getGetUsersUsersGet200Response: () => [
    {
      id: "1",
      username: "Dobby",
      email: "dobby@hogwarts.com",
      createdAt: "2021-01-01",
    },
    {
      id: "2",
      username: "Harry Potter",
      email: "harry.potter@hogwarts.com",
      createdAt: "2021-01-02",
    },
    {
      id: "3",
      username: "Hermione Granger",
      email: "hermione.granger@hogwarts.com",
      createdAt: "2021-01-03",
    },
    {
      id: "4",
      username: "Ron Weasley",
      email: "ron.weasley@hogwarts.com",
      createdAt: "2021-01-04",
    },
  ],
};

export default userControllers;
