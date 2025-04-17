import { IParticipantDto } from "../../../api/chatApi";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updateActiveParticipant } from "../../../state/slices/chatSlice";

interface participantsProps{
  queryRes:IParticipantDto[]
  filteredParticipants:IParticipantDto[]
}
const Participants = ({queryRes, filteredParticipants}:participantsProps) => {

  const dispatch = useAppDispatch();
  const currentParticipant = useAppSelector(
    (state) => state.chatSlice.activeParticipant
  );


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