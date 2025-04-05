import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { IParticipantDto } from "../../../api/chatApi";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updateActiveParticipant } from "../../../state/slices/chatSlice";

interface participantsProps{
  queryRes:UseQueryResult<IParticipantDto[], Error>
  filteredParticipants:IParticipantDto[]
}
const Participants = ({queryRes, filteredParticipants}:participantsProps) => {

  const {error, isError, isPending:isFetchingParticipants} = queryRes;
  const dispatch = useAppDispatch();
  const currentParticipant = useAppSelector(
    (state) => state.chatSlice.activeParticipant
  );

  useEffect(() => {
    if (!currentParticipant && filteredParticipants.length > 0) {
      dispatch(updateActiveParticipant(filteredParticipants[0]));
    }
  }, [currentParticipant, dispatch, filteredParticipants]);

  if (isFetchingParticipants) {
    return <LoaderSpinner />;
  }

  if (isError) {
    return <div>Error loading participants: {error && error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredParticipants.map(({ profilePicture, userId, userName, isFollowing }) => {
        const isActive = currentParticipant?.userId === userId;
        return (
          <div
            className={`flex justify-between hover:bg-pink-100 rounded-md cursor-pointer p-2 ${
              isActive ? "bg-pink-200" : ""
            }`}
            key={userId}
            onClick={() => dispatch(updateActiveParticipant({ profilePicture, userId, userName, isFollowing }))}
          >
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={profilePicture} 
                  alt={`${userName}'s profile`} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-profile.png';
                  }}
                />
              </div>
              <div>
                <p>{userName}</p>
                {isFollowing}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Participants;