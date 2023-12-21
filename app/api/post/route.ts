import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import idl from "@/post_app_anchor.json";

export async function POST(request: NextRequest) {
  console.log(await request.json());
  return NextResponse.json({ message: "adsfds" });
}
