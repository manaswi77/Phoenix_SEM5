import database from "../../config/watermelon.config";
import User from "../../database/models/User.model";

type Token = string;

export const createOrUpdateSession = async (token: Token): Promise<void> => {
  await database.action(async () => {
    const existingUser = await database
      .get<User>("users")
      .query((user: { isLoggedIn: { eq: (arg0: boolean) => any } }) =>
        user.isLoggedIn.eq(true)
      )
      .fetch();

    if (existingUser.length > 0) {
      const user: User = existingUser[0];
      await user.update((u) => {
        u.token = token;
      });
    } else {
      await database
        .get<User>("users")
        .create((u: { isLoggedIn: boolean; token: string }) => {
          u.isLoggedIn = true;
          u.token = token;
        });
    }
  });
};

export const deleteSession = async (): Promise<void> => {
  await database.action(async () => {
    const existingUser = await database
      .get<User>("users")
      .query((user: { isLoggedIn: { eq: (arg0: boolean) => any } }) =>
        user.isLoggedIn.eq(true)
      )
      .fetch();

    if (existingUser.length > 0) {
      const user: User = existingUser[0];
      await user.update((u) => {
        u.isLoggedIn = false;
        u.token = "";
      });
    }
  });
};

export const checkSession = async (): Promise<boolean> => {
  const existingUser = await database
    .get<User>("users")
    .query((user: { isLoggedIn: { eq: (arg0: boolean) => any } }) =>
      user.isLoggedIn.eq(true)
    )
    .fetch();

  return existingUser.length > 0;
};
