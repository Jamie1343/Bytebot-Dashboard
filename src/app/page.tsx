"use client";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ralway } from "./utils/fonts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="mt-12">
      <div className="flex flex-row gap-36">
        <div className="w-[50%] px-8">
          <h1 className={`text-6xl ${ralway.className} font-semibold`}>Introducing ByteBot: Your Ultimate Discord Companion!</h1>
          <br />
          <p className={`text-3xl ${ralway.className} `}>ByteBot enhances your Discord experience by providing seamless integration and powerful features. Discover how our bot can transform your server into a vibrant community hub!</p>
          <div className={`${ralway.className} font-semibold flex flex-row gap-8 mt-8`}>
            <button className="bg-[#FFF05A] p-3 rounded-2xl w-36">Get Started</button>
            <button className="bg-[#FFF05A] p-3 rounded-2xl w-36">More Info</button>
          </div>
        </div>
        <div className="w-[40%]  ml-auto">
          <Image src={"/images/computer.svg"} alt={"Computer SVG"} width={478} height={370} className="mx-auto w-[60%]"></Image>
        </div>
      </div>
      <br />
      <hr className="mt-44 w-[80%] mx-auto mb-12" />
      <Footer></Footer>
    </div>
  );
}
