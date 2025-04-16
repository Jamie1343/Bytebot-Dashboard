"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ralway } from "../utils/fonts";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  let signedIn;

  if (status != "authenticated") {
    signedIn = (
      <button onClick={() => signIn("discord", { callbackUrl: "/servers" })} className="bg-[#16B9E6] p-3 rounded-xl hover:scale-105 hover:cursor-pointer transition-transform">
        Login With Discord
      </button>
    );
  } else {
    signedIn = (
      <div className="flex flex-row gap-4">
        <Link href={"/servers"}>
          <button className="bg-blue-700 text-white text-lg p-3 rounded-xl hover:scale-105 hover:cursor-pointer transition-transform w-44">Manage Servers</button>
        </Link>
        <button onClick={() => signOut()} className="bg-red-600 text-lg text-white p-3 rounded-xl hover:scale-105 hover:cursor-pointer transition-transform w-44">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className={`w-screen h-20 flex flex-row items-center ${ralway.className} font-bold text-xl`}>
      <div className="ml-6">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt={"Logo"} width={80} height={80} />
        </Link>
      </div>
      <ul className="flex flex-row gap-4 ml-4">
        <li className="hover:scale-110 transition-transform">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hover:scale-110 transition-transform">
          <Link href={"https://discord.com/oauth2/authorize?client_id=1296487151067856896"}>Invite</Link>
        </li>
        <li className="hover:scale-110 transition-transform">
          <Link href={"/commands"}>Commands</Link>
        </li>
      </ul>
      <div className="ml-auto mr-6 text-xs">{signedIn}</div>
    </div>
  );
}
