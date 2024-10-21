import Database from "@nozbe/watermelondb/Database";
import { SQLiteAdapter } from "@nozbe/watermelondb/adapters/sqlite";
import { appSchema } from "@nozbe/watermelondb";
import { securityScreenSchema } from "../database/schemas/SecurityScreen.schema";
import { userSchema } from "../database/schemas/User.Schema";
import UserModel from "../database/models/User.model";
import SecurityScreenModel from "../database/models/SecurityScreen.model";

const adapter = new SQLiteAdapter({
  dbName: "myapp",
  schema: appSchema({
    version: 1,
    tables: [userSchema, securityScreenSchema],
  }),
});

const database = new Database({
  adapter,
  modelClasses: [UserModel, SecurityScreenModel],
});

export default database;
