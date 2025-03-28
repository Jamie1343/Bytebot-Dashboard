import { TypeORMAdapter } from "@auth/typeorm-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import * as entities from "../../../lib/entities";
import { AppDataSource } from "@/app/lib/datasource";

export const OPTIONS: AuthOptions = {
  adapter: TypeORMAdapter(
    {
      type: "mysql",
      url: process.env.AUTH_TYPEORM_CONNECTION as string,
      database: "byte_bot",
      synchronize: true,
    },
    { entities: entities }
  ),
  session: {
    strategy: "database",
  },
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify guilds guilds.members.read",
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const data = await AppDataSource;
      const manager = data.manager;

      const DbUser = await manager.findOneBy(entities.AccountEntity, {
        userId: user.id,
      });

      const accessToken = DbUser?.access_token;
      const userID = DbUser?.userId;

      return { ...session, accessToken, userID };
    },
  },

  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
