"use client";
import { useState, useEffect } from "react";
import Post from "./components/post";
import { addPostAlert } from "./components/AddPost";
import { postType } from "./components/post";
import withReactContent from "sweetalert2-react-content";
import { PublicKey } from "@solana/web3.js";
import Swal from "sweetalert2";
import { createPost, getPost } from "./utils/solana_custom_functions";
import "material-design-icons";

export default function Home() {
  const [walletAddress, setWalletAdresss] = useState("");
  const [loading, setLoading] = useState(false);
  const [myPublicKey, setMyPublicKey] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [formData, setFormData] = useState<{}>({});

  const connectWallet = async () => {
    const { solana } = window as any;
    const myPublicKey = (await solana.connect()).publicKey;
    setMyPublicKey(myPublicKey);
    setWalletAdresss(myPublicKey);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    getPost().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gray-300 items-center shadow-lg justify-between">
      <div className="flex flex-col min-h-[90vh] w-[100%] p-10 bg-slate-100 my-3 rounded-lg  shadow-xl md:max-w-[1000px]">
        <h1 className="text-[40px]">Solana Post App</h1>
        <div className="flex">
          <p className="text-[20px] mr-auto">Posts:</p>
          <button
            onClick={addPostAlert}
            className="rounded shadow shadow-slate-400 bg-violet-500 hover:bg-violet-600 active:bg-violet-500 w-[50px] h-[40px] flex items-center justify-center"
          >
            <span className="material-symbols-outlined  text-white  flex justify-end items-baseline">
              add
            </span>
          </button>
        </div>

        {posts &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                post={
                  {
                    ...post.account,
                    publicKey: (post.publicKey as PublicKey).toBase58(),
                  } as postType
                }
              />
            );
          })}
      </div>
    </main>
  );
}
