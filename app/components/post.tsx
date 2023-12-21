"use client";
import React from "react";
import Image from "next/image";
import { Poor_Story } from "next/font/google";
import { PublicKey } from "@solana/web3.js";

export type postType = {
  title: String;
  body: String;
  imageUrl: string;
  publicKey: string;
};

const Post = ({ post }: { post: postType }) => {
  console.log(post);
  return (
    <div className="min-w-[100px] overflow-hidden bg-slate-300 rounded m-10 min-h-[60px] p-5 flex flex-col  shadow-lg">
      <p className="text-[13px]">Program ID: {post.publicKey}</p>
      <h1 className="font-bold text-[20px] mb-4">{[post.title]}</h1>
      <p>{post.body}</p>
      <img
        className="w-[400px] m-auto mt-10"
        src={post.imageUrl as string}
        alt="user_uploaded_image"
      />
    </div>
  );
};

export default Post;
