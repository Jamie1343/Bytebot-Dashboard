import { DataSource } from "typeorm";
import { AccountEntity, BotGuildEntity, BotModerationEntity, SessionEntity, UserEntity, VerificationTokenEntity } from "./entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "byte_bot",
  url: process.env.AUTH_TYPEORM_CONNECTION,
  entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity, BotGuildEntity, BotModerationEntity],
  synchronize: true,
}).initialize();
