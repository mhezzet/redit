import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { InputType, Field } from "type-graphql";
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
};

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
