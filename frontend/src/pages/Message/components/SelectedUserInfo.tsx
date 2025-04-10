import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getGeneralUserInfo } from "../../../api/userApi";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { useAppSelector } from "../../../state/hooks";

const SelectedUserInfo = () => {
  const selectedUserId = useAppSelector(
    (state) => state.chatSlice.activeParticipant?.userId
  );

  const {
    data: userInfo,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["general-info", selectedUserId],
    enabled: !!selectedUserId,
    queryFn: () => {
      if (!selectedUserId) throw new Error("No user selected");
      return getGeneralUserInfo(selectedUserId);
    },
  });

  if (!selectedUserId) {
    return (
      <div className="px-5 py-10 text-center text-gray-500">
        Select a user to view their profile
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-5 py-10 text-center text-red-500">
        {error instanceof Error ? error.message : "Failed to load user info"}
      </div>
    );
  }

  const { email, joinedOn, profilePicture, userName } = userInfo;

  return (
    <div className="px-5 py-6 space-y-6 max-w-md mx-auto ">
      <div className="flex flex-col items-center">
        <img
          className="size-32 rounded-full object-cover border-2 border-gray-200"
          src={profilePicture}
          alt={`${userName}'s profile`}
        />
        <h2 className="mt-4 text-xl font-bold text-gray-800">{userName}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">EMAIL</p>
          <p className="text-gray-800 break-all">{email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">JOINED</p>
          <p className="text-gray-800">
            {format(new Date(joinedOn), "MMM d, yyyy")}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">BIO</p>
          <p className="text-gray-800">{"No bio yet"}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserInfo;