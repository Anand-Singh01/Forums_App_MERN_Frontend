import ImageIcon from "@mui/icons-material/Image";
import { useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { useAppSelector } from "../../../../../state/hooks";
import { getProfileImageSelector } from "../../../../../state/slices/userInfoSlice";
const AddPost = () => {
  const profileImage = useAppSelector((state) =>
    getProfileImageSelector(state)
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [addedImage, setAddedImage] = useState<{
    value: File | null;
    title: string | null;
  }>({
    value: null,
    title: null,
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

  return (
    <div
      className="rounded-md bg-gradient-to-tr from-purple-50 
    to-purple-100 p-3 w-full shadow-sm space-y-3"
    >
      <section className="flex items-center gap-3 border-b-[1px] p-3">
        <Avatar className="self-start">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full space-y-1">
          <Input className="bg-white" placeholder="What's on your mind?" />
          <Input className="bg-white md:w-[50%]" placeholder="Location" />
        </div>

        <Button className="bg-blue-500 self-start">Post</Button>
      </section>
      <section
        onClick={() => {
          fileInputRef.current?.click();
        }}
        className="flex gap-1 cursor-pointer hover:bg-purple-100 
      items-center py-1 px-3 w-fit rounded-md"
      >
        <ImageIcon sx={{ fontSize: "1.5rem", color: "#cfa3f3" }} />
        <p className="font-semibold text-sm  text-gray-600">Photo</p>
      </section>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddPost;