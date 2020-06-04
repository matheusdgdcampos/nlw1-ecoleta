import Knex from "knex";
import { resolve } from "path";

export const connection = Knex({
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});
