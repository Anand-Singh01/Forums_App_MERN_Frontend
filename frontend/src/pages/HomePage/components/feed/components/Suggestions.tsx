import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { updateFollow } from "../../../../../api/follower-followApi";
import { getAllUserSuggestions } from "../../../../../api/userApi";
import { Button } from "../../../../../components/ui/button";
import LoaderSpinner from "../../../../../shared/components/LoaderSpinner";
import { qcChangeFollowStateInSuggestions } from "../../../../../state/tanstack/queryClient";

const Suggestions = () => {
  const { data = [], isPending: isFetchingSuggestions } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getAllUserSuggestions,
  });

  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const { mutate, isPending: isUpdatingFollow } = useMutation({
    mutationFn: (friendId: string) => updateFollow(friendId),
    onSuccess: (_, friendId) => {
      qcChangeFollowStateInSuggestions(friendId);
      setSelectedButton(null);
    },
  });

  if (isFetchingSuggestions) {
    return <LoaderSpinner />;
  }
  const filteredSuggestions = data.splice(0, 3)
  return (
    <div className="text-gray-500 p-4 rounded-md bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">You might like</h2>
        <p className="text-blue-400 font-semibold cursor-pointer">See All</p>
      </div>
      <div className="space-y-5 flex flex-col">
        {filteredSuggestions.map(({ profilePicture, userId, userName, isFollowing }) => {
          return (
            <div className="flex justify-between" key={userId}>
              <div className="flex items-center gap-2">
                <div className="size-10">
                  <img className="" src={profilePicture} alt="" />
                </div>
                <div>
                  <p>{userName}</p>
                  <p className="text-[0.8rem]">15 Mutuals</p>
                </div>
              </div>
              <div>
                <Button
                  disabled={selectedButton === userId && isUpdatingFollow}
                  onClick={() => {
                    setSelectedButton(userId);
                    mutate(userId);
                  }}
                  className="shadow-md bg-[#fb64b6] 
                hover:bg-[#d775ab] cursor-pointer"
                >
                  {selectedButton === userId && isUpdatingFollow ? (
                    <LoaderSpinner />
                  ) : isFollowing ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;