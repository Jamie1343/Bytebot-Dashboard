"use client";
import { Session } from "next-auth";
import React from "react";
import { SessionData } from "../utils/types";

export default function ServerManager({ session }: { session: SessionData }) {
  return (
    <div>
      {JSON.stringify(session)}
      ServerManager
      <br />
      <label className="switch">
        <input type="checkbox" defaultChecked={true} />
        <span className="slider round"></span>
      </label>
      <br />
      <button onClick={() => console.log("1")}>1</button>
      <button onClick={() => console.log("2")}>2</button>
      <button onClick={() => console.log("3")}>3</button>
      <button onClick={() => console.log("4")}>4</button>
      <button onClick={() => console.log("5")}>5</button>
    </div>
  );
}
