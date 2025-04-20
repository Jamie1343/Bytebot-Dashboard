"use server";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import ServerManager from "@/app/components/ServerManager";
import { AppDataSource } from "@/app/lib/datasource";
import * as entities from "@/app/lib/entities";
import { AccountEntity, BotGuildEntity } from "@/app/lib/entities";
import { refreshToken } from "@/app/utils/tokenRefresh";
import { SessionData } from "@/app/utils/types";
import axios from "axios";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: any }) {
  const { guild } = await params;

  let session = (await getServerSession(OPTIONS)) as SessionData;

  const manager = (await AppDataSource).manager;
  const expires = await manager.findOneBy(AccountEntity, {
    userId: session.userID,
  });

  if (expires!.expires_at! < Date.now() / 1000 && expires?.refresh_token != null) {
    refreshToken(expires?.refresh_token);
    console.log("Token Refresh");
    session = (await getServerSession(OPTIONS))!;
  }

  const guilds = await manager.find<entities.BotGuildEntity>(BotGuildEntity, {
    //@ts-expect-error
    guild_id: guild,
  });

  const param = await params;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://discord.com/api/users/@me/guilds?limit=1&after=${BigInt(param.guild) - BigInt(1)}`,
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  };

  const perms = (await axios.request(config)).data[0].permissions;
  console.log(perms);

  if (perms.toString() != "2147483647") {
    redirect("/");
  }

  return (
    <div>
      page {guild} <br />
      {JSON.stringify(
        guilds.find((guildItem) => {
          if (guildItem.guild_id === guild) {
            return true;
          }
        })
      )}
      {}
      <ServerManager session={session}></ServerManager>
    </div>
  );
}
