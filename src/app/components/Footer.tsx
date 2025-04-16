import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ralway } from "../utils/fonts";

export default function Footer() {
  return (
    <div>
      <div className="flex flex-row">
        <div>
          <Image src={"/images/logo.png"} alt="logo" width={90} height={90} className="ml-6"></Image>
        </div>
        <div className="text-center w-[100%] ">
          <ul className={`flex flex-row justify-center gap-4 text-[#4C4C4C] ${ralway.className}`}>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"https://discord.com/oauth2/authorize?client_id=1296487151067856896"}>Invite</Link>
            </li>
            <li>
              <Link href={"/commands"}>Commands</Link>
            </li>
            <li>
              <Link href={"/servers"}>Manage</Link>
            </li>
          </ul>
        </div>
        {/* Positioning Element (Hidden) */}
        <div className="ml-auto invisible">
          <Image src={"/images/logo.png"} alt="logo" width={90} height={90} className="mr-6"></Image>
        </div>
      </div>
      <div>
        <p className="ml-6 mr-4 text-[#4C4C4C]">© 2025 ByteBot. All rights reserved.</p>
      </div>
    </div>
  );
}
