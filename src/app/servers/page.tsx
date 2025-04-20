import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { GuildData, SessionData } from "../utils/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ralway } from "../utils/fonts";
import qs from "qs";
import { AppDataSource } from "../lib/datasource";
import { AccountEntity } from "../lib/entities";
import { refreshToken } from "../utils/tokenRefresh";

export default async function ServerList() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://discord.com/api/users/@me",
    headers: {
      Authorization: `Bot ${process.env.MAINTOKEN}`,
    },
  };

  const defaultImage = (await axios.request(config)).data.avatar;

  let session: SessionData = (await getServerSession(OPTIONS))!;
  let servers;

  const manager = (await AppDataSource).manager;
  const expires = await manager.findOneBy(AccountEntity, {
    userId: session.userID,
  });

  if (expires!.expires_at! < Date.now() / 1000 && expires?.refresh_token != null) {
    refreshToken(expires?.refresh_token);
    console.log("Token Refresh");
    session = (await getServerSession(OPTIONS))!;
  }

  if (session != null) {
    // if((session as any).)

    const token = (session as any).accessToken;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://discord.com/api/users/@me/guilds",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);

    const data = res.data as Array<GuildData>;

    servers = data.map(async (guild) => {
      if (guild.permissions.toString() != "2147483647") {
        return;
      }
      return (
        <Link href={`/manage/${guild.id}`} key={guild.id}>
          <div className="flex flex-col items-center hover:scale-105 transition-transform">
            <Image src={guild.icon != null ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : `https://cdn.discordapp.com/avatars/1296487151067856896/${defaultImage}.png`} alt={guild.name} width={1024} height={1024} className="w-[20%] rounded-xl"></Image>
            <h2 className={`${ralway.className} text-xl font-bold`}>{guild.name}</h2>
          </div>
        </Link>
      );
    });
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-6 mt-6 w-[90%] mx-auto bg-black/25 py-8 rounded-xl">{servers}</div>
    </div>
  );
}
