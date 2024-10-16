import Database from "@nozbe/watermelondb/Database";
import { SQLiteAdapter } from "@nozbe/watermelondb/adapters/sqlite";
import SecurityScreenModel from "../db/models/SecurityScreen.model";
import { securityScreenSchema } from "../db/schemas/SecurityScreen.schema";

const adapter = new SQLiteAdapter({
  dbName: "myapp",
  schema: {
    version: 1,
    tables: [securityScreenSchema],
  },
});

const database = new Database({
  adapter,
  modelClasses: [SecurityScreenModel],
});

export default database;
