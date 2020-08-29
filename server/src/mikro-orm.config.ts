import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: "redit",
  debug: true,
  type: "postgresql",
  password: "123",
} as Parameters<typeof MikroORM.init>[0];

// const config1 = {
//   entities: [Post],
//   dbName: process.env.POSTGRES_DB,
//   debug: process.env.NODE_ENV !== "production",
//   type: "postgresql",
//   user: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   host: "db",
// }
