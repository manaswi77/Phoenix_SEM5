import { tableSchema } from "@nozbe/watermelondb";

export const userSchema = tableSchema({
  name: "user",
  columns: [
    { name: "isLoggedIn", type: "boolean" },
    { name: "token", type: "string" },
  ],
});
