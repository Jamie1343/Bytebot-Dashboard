import { getServerSession } from "next-auth";
import Image from "next/image";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import axios from "axios";
import { GuildData } from "./utils/types";

export default async function Home() {
  const session = await getServerSession(OPTIONS);

  return (
    <div>
      {JSON.stringify(session)}
      <Link href={"http://localhost:3000/api/auth/signout/discord"}>
        <button>Sign Out</button>
      </Link>
      <Link href={"http://localhost:3000/api/auth/signin/discord"}>
        <button>Sign in</button>
      </Link>
    </div>
  );
}
