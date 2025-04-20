import axios from "axios";
import { AppDataSource } from "../lib/datasource";
import { AccountEntity } from "../lib/entities";
import qs from "qs";

export async function refreshToken(token: string) {
  // refresh token

  let data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: token,
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://discord.com/api/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const req = (await axios.request(config)).data;

  const expires = Math.round(Date.now() / 1000) + parseInt(req.expires_in);
  const refreshToken = req.refresh_token;
  const accessToken = req.access_token;

  const manager = (await AppDataSource).manager;
  const account = await manager.findOneBy(AccountEntity, {
    access_token: token,
  });
  account!.expires_at = expires;
  account!.refresh_token = refreshToken;
  account!.access_token = accessToken;
  await manager.save(account);
}
