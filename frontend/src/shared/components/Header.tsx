import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { useAppSelector } from "../../state/hooks";
import {
  getProfileImageSelector,
  getUserNameSelector,
} from "../../state/slices/userInfoSlice";

const Header = () => {
  const { userName, profileImage } = useAppSelector((state) => ({
    userName: getUserNameSelector(state),
    profileImage: getProfileImageSelector(state),
  }));

  return (
    <div className="flex justify-between items-center p-4 px-8 bg-pink-100 shadow-md">
      <section className="flex gap-20 w-full items-center">
        <h2 className="text-xl font-semibold text-pink-600">Joygram</h2>
        {/* <Input
          className="md:w-[50%] w-[40%] bg-white"
          placeholder="Search friends here"
        ></Input> */}
      </section>
      <section className="flex gap-3 items-center">
        {/* <Avatar>
          <AvatarImage src={profileImage.length > 0 ? profileImage : 'https://github.com/shadcn.png'}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <p className="font-medium text-gray-700">{userName}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </section>
    </div>
  );
};

export default Header;


