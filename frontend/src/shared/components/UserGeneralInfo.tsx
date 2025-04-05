import React from "react";

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
        <img
          className="w-8 h-8 rounded-full object-cover mt-1 flex-shrink-0"
          src={profileImage}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-profile.png";
          }}
        />
        <div>
          <p>{userName}</p>
          <p className="text-gray-500 text-sm">{region}</p>
        </div>
      </div>
    </div>
  );
};

export default UserGeneralInfo;