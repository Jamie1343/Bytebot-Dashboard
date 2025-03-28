"use client";
import { getSession } from "next-auth/react";
import React from "react";

export default async function ServerItem({ id, icon, token, userId }: { id: string; icon: string; token: string; userId: string }) {
  const session = getSession();

  return <div></div>;
}
