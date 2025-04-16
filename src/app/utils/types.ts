export interface GuildData {
  id: string;
  name: string;
  icon: string;
  banner: string;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: string[];
}

export interface GuildToggles {
  applicationCommands: boolean;
  ban: boolean;
  mute: boolean;
  embedMaker: boolean;
  giveaways: boolean;
  purge: boolean;
  setNickname: boolean;
  role: boolean;
}
