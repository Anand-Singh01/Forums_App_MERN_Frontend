import ImageIcon from "@mui/icons-material/Image";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { addPostApi } from "../../../../../api/postApi";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { IPostInfo } from "../../../../../shared/interfaces";
import { useAppSelector } from "../../../../../state/hooks";
import { getProfileImageSelector } from "../../../../../state/slices/userInfoSlice";
import { queryClient } from "../../../../../state/tanstack/queryClient";

export interface IPostData {
  caption: string;
  location: string | null;
}

const AddPost = () => {
  const profileImage = useAppSelector(getProfileImageSelector);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [postInfo, setPostInfo] = useState<IPostData>({
    caption: "",
    location: null,
  });

  const [addedImage, setAddedImage] = useState<{
    value: File | null;
    title: string | null;
  }>({
    value: null,
    title: null,
  });

  const { mutate, isPending } = useMutation<IPostInfo, Error>({
    mutationFn: async () => {
      if (!addedImage.value) {
        throw new Error("Please select an image");
      }
      return await addPostApi(
        addedImage.value,
        postInfo.caption,
        postInfo.location
      );
    },
    onSuccess: (addedPost: IPostInfo) => {
      queryClient.setQueryData(["posts"], (prevData: IPostInfo[] | undefined) => {
        if (!prevData) {
          return [addedPost];
        }
        return [addedPost, ...prevData];
      });
      // Reset form on success
      setPostInfo({ caption: "", location: null });
      setAddedImage({ value: null, title: null });
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddedImage({
        title: file.name,
        value: file,
      });
    }
  };

  const handleSubmit = () => {
    if (!postInfo.caption.trim()) {
      toast.error("Please enter a caption");
      return;
    }
    mutate();
  };

  return (
    <div className="rounded-md p-3 w-full space-y-1 shadow-sm">
      <section className="flex items-center gap-3 p-3">
        <Avatar className="self-start">
          <AvatarImage src={profileImage || "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full space-y-2">
          <Input
            className="bg-gray-100 border-none"
            placeholder="What's on your mind?"
            value={postInfo.caption}
            onChange={(e) =>
              setPostInfo({ ...postInfo, caption: e.target.value })
            }
          />
          <Input
            className="bg-gray-100 border-none md:w-[50%]"
            placeholder="Location"
            value={postInfo.location || ""}
            onChange={(e) =>
              setPostInfo({ ...postInfo, location: e.target.value || null })
            }
          />
        </div>
      </section>
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex gap-1 border bg-gray-100 cursor-pointer hover:bg-purple-100 
            items-center py-1 px-3 w-fit rounded-md"
          >
            <ImageIcon sx={{ fontSize: "1.5rem", color: "#fb64b6 " }} />
            <p className="font-semibold text-sm text-gray-600">Add Photo</p>
          </div>
          {addedImage.title && (
            <p className="text-blue-500 font-semibold">{addedImage.title}</p>
          )}
        </div>
        <Button
          className="w-[5rem] shadow-sm bg-pink-400 h-[2rem]"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Post"}
        </Button>
      </section>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddPost;