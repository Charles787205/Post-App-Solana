import idl from "@/post_app_anchor.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";

const programID = "JCAKiGxPrPMpZARbSswpK8NpbeUC7ZJCenmw2hvVhXp9";

export async function createPost(
  title: String,
  description: String,
  imageUrl: String
) {
  const { solana } = window as any;
  const connection = new Connection(clusterApiUrl("devnet"));
  const anchorProvider = new AnchorProvider(connection, solana, {
    commitment: "processed",
  });
  console.log(solana);
  const program = new Program(
    JSON.parse(JSON.stringify(idl)),
    new PublicKey(programID),
    anchorProvider
  );
  const keyPair = web3.Keypair.generate();
  //create_post(title, description, image_url)
  const transaction = await program.methods
    .createPost(title, description, imageUrl)
    .accounts({
      post: keyPair.publicKey,
      user: anchorProvider.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([keyPair])
    .rpc();
}

export const getPost = async () => {
  const { solana } = window as any;
  console.log(solana);
  const keyPair = web3.Keypair.generate();

  const connection = new Connection(clusterApiUrl("devnet"));
  const anchorProvider = new AnchorProvider(connection, solana, {
    commitment: "processed",
  });
  const program = new Program(
    JSON.parse(JSON.stringify(idl)),
    new PublicKey(programID),
    anchorProvider
  );
  const data = await program.account.post.all();

  return data;
};
