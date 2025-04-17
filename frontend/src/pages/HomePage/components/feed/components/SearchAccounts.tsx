import { useMutation } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersByKeywords } from "../../../../../api/userApi";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Input } from "../../../../../components/ui/input";
import { useAppDispatch } from "../../../../../state/hooks";
import { updateselectedUserProfileIdId } from "../../../../../state/slices/postSlice";

const SearchAccounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutate,
    isPending,
    isError,
    error,
    data: users = [],
  } = useMutation({
    mutationFn: () => getUsersByKeywords(debouncedTerm),
    onSuccess: () => {},
  });

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    if (debouncedTerm.trim() !== "") {
      mutate();
    }
  }, [debouncedTerm, mutate]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search accounts..."
          className="pl-9"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {isPending && (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center py-4">
          {error.message || "Failed to search users"}
        </p>
      )}

      {!isPending && !isError && users.length > 0 && (
        <div className="space-y-2 cursor-pointer">
          {users.map(({ userName, profilePicture, userId }) => (
            <div
              key={userName}
              onClick={() => {
                dispatch(updateselectedUserProfileIdId(userId));
                navigate("/profile");
              }}
              className="flex items-center gap-3 p-2 
              hover:bg-accent rounded-lg transition-colors"
            >
              <Avatar>
                <AvatarImage className="object-cover" src={profilePicture} />
                <AvatarFallback>
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{userName}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isPending && !isError && users.length === 0 && debouncedTerm && (
        <p className="text-center py-4 text-muted-foreground">
          No accounts found
        </p>
      )}
    </div>
  );
};

export default SearchAccounts;