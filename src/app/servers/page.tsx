import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { GuildData } from "../utils/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ralway } from "../utils/fonts";

//refresh token
// const axios = require('axios');
// const qs = require('qs');
// let data = qs.stringify({
//   'grant_type': 'refresh_token',
//   'refresh_token': '82pjMkCzyh4ULDi5Cv6BS2AJyLDRzW',
//   'client_id': '1296487151067856896',
//   'client_secret': 'Hs_n4t_Jbo0-P61ceYp9G1U58xBbekqD'
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://discord.com/api/oauth2/token',
//   headers: {
//     'Cookie': '__dcfduid=72cf97361ade11f080df8686bdfc1560; __sdcfduid=72cf97361ade11f080df8686bdfc15600fec99f8d743e795af454e04b1b88a957360e8ccdfa2c81e0ef10aeed33e8946; __cfruid=83d8c6d8f1cc006a8151e0ef662a6a0aff4f0454-1744820316; _cfuvid=cG6.JF7ZclRW18AlkKeoAgpmxdjKtNEB5tRPkpKlPgk-1744820316043-0.0.1.1-604800000',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

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
          <div className="flex flex-col items-center hover:scale-105 transition-transform">
            <Image src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} width={1024} height={1024} className="w-[20%] rounded-xl"></Image>
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
