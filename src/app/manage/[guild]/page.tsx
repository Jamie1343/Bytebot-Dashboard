"use server";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import ServerManager from "@/app/components/ServerManager";
import { AppDataSource } from "@/app/lib/datasource";
import * as entities from "@/app/lib/entities";
import axios from "axios";
import { getServerSession, Session } from "next-auth";
import React from "react";

export default async function page({ params }: { params: any }) {
  const { guild } = await params;
  let session: Session;
  session = (await getServerSession(OPTIONS)) as Session;
  const token = (session as any).token;

  // ${(session as any).userID}
  // 1296487151067856896;

  const dataDB = await AppDataSource;
  const manager = dataDB.manager;

  const guilds = await manager.find<entities.BotGuildEntity>(entities.BotGuildEntity, {
    //@ts-expect-error
    guild_id: guild,
  });

  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: `https://discord.com/api/guilds/${guild}/members/582612701369335809`,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     Cookie:
  //       "__dcfduid=a475dba00b0d11f0ac90a2bbcafbb955; __sdcfduid=a475dba00b0d11f0ac90a2bbcafbb955f92f91409a49c02fc5c12046eddebe86c4bed9cd6e3079971d5938cc0b64bee4; __cfruid=fb3a1c8da57f753ab2166796ec205bf261e8f425-1743081367; _cfuvid=sQE4.1BkYZB50O5g_74VYVUJ2_duqPE1vbX6UW08cjM-1743081367077-0.0.1.1-604800000",
  //   },
  // };

  // const data = (await axios.request(config)).data;

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
      <ServerManager session={session}></ServerManager>
    </div>
  );
}
