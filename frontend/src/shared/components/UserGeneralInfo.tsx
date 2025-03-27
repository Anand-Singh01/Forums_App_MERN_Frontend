import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

interface IUserGeneralInfo {
  userName: string;
  profileImage: string;
  region: string | null;
}
const UserGeneralInfo: React.FC<IUserGeneralInfo> = ({
  region,
  profileImage,
  userName,
}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p>{userName}</p>
          <p className="text-gray-500 text-sm">{region}</p>
        </div>
      </div>
    </div>
  );
};

export default UserGeneralInfo;
