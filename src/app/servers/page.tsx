import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { GuildData } from "../utils/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ServerList() {
  const session = await getServerSession(OPTIONS);
  let servers;

  if (session != null) {
    const token = (session as any).accessToken;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://discord.com/api/users/@me/guilds",
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie:
          "__dcfduid=a475dba00b0d11f0ac90a2bbcafbb955; __sdcfduid=a475dba00b0d11f0ac90a2bbcafbb955f92f91409a49c02fc5c12046eddebe86c4bed9cd6e3079971d5938cc0b64bee4; __cfruid=fb3a1c8da57f753ab2166796ec205bf261e8f425-1743081367; _cfuvid=sQE4.1BkYZB50O5g_74VYVUJ2_duqPE1vbX6UW08cjM-1743081367077-0.0.1.1-604800000",
      },
    };

    const res = await axios.request(config);

    const data = res.data as Array<GuildData>;

    servers = data.map(async (guild) => {
      return (
        <Link href={`/manage/${guild.id}`} key={guild.id}>
          <div>
            <Image src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} width={50} height={50}></Image>
            <h2>{guild.name}</h2>
          </div>
        </Link>
      );
    });
  }

  return (
    <div>
      <h1>server list {JSON.stringify(session)}</h1>
      <div className="grid grid-cols-3">{servers}</div>
    </div>
  );
}
