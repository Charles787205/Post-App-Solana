"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createPost } from "../utils/solana_custom_functions";
type addPostProps = {
  setData: Function;
  data: object;
};

const checkImage = (path: string) => {
  const img = new Image();
  img.onload = () => {
    return true;
  };
  img.onerror = () => {
    return false;
  };
  img.src = path;
  return false;
};
export const addPostAlert = () => {
  withReactContent(Swal)
    .fire({
      title: "Create Post",
      html: <AddPost />,
      width: "600px",
      showLoaderOnConfirm: true,
      confirmButtonText: "Post",
      showCancelButton: true,
      preConfirm: async (login) => {
        const title = (
          document.getElementById("title_field") as HTMLInputElement
        ).value;
        const description = (
          document.getElementById("description_field") as HTMLInputElement
        ).value;
        const imageUrl = (
          document.getElementById("image_url_field") as HTMLInputElement
        ).value;
        if (title == "") {
          Swal.showValidationMessage("Title is blank.");
          return false;
        }
        if (description === "") {
          Swal.showValidationMessage("Description is blank.");
          return false;
        }
        const promise = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log("Image loaded successfully");
            resolve({ title, description, imageUrl });
          };
          img.onerror = () => {
            console.log("Image loading error");
            reject("Invalid image URL");
          };
          img.src = imageUrl;
        }).then(
          (onLoaded) => {
            return onLoaded;
            console.log("loaded");
          },
          (onRejected) => {
            Swal.showValidationMessage("Image doesn't exist");
            return false;
            console.log("rejected");
          }
        );
        console.log(promise);
        return promise;
      },
    })
    .then(async (response) => {
      if (response.isConfirmed) {
        console.log(response.value);
        const { title, description, imageUrl } = response.value;
        await createPost(title, description, imageUrl).then(
          () => {
            Swal.fire({
              title: "Post uploaded",
              text: "Please wait for a few seconds to refresh.",
              icon: "success",
            });
          },
          () => {
            Swal.fire({
              title: "Post upload failed",
              text: "Possible reasons is that the image url is too long  (500 characters only).",
              icon: "error",
            });
          }
        );
      }
    });
};

const AddPost = () => {
  const [data, setData] = useState<{}>({});
  const [isImageValid, setIsImageValid] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h3>Title</h3>
      <input
        onChange={(e) => {
          setData({ ...data, title: e.target.value });
        }}
        id="title_field"
        type="text"
        className="border-slate-400 border rounded shadow-inner p-2 w-[90%]"
      />
      <h3>Description</h3>

      <textarea
        name="description"
        id="description_field"
        onChange={(e) => {
          setData({ ...data, description: e.target.value });
        }}
        cols={30}
        rows={10}
        className="border-slate-400 border rounded shadow-inner p-2 w-[90%]"
      ></textarea>
      <h3>Image URL</h3>
      <input
        onChange={(e) => {
          setImageUrl(e.target.value);
          const img = new Image();
          img.src = e.target.value;
          img.onload = () => setIsImageValid(true);
          img.onerror = () => setIsImageValid(false);
        }}
        id="image_url_field"
        placeholder="Paste image url here"
        type="text"
        className={`border-slate-400 border rounded shadow-inner p-2 w-[90%] 
        
        ${
          imageUrl != "" &&
          (isImageValid
            ? "outline-green-500 border-green-500"
            : "outline-red-500 border-red-500")
        }`}
      />
    </div>
  );
};
