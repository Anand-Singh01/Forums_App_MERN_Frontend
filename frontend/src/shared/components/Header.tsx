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
    <div className="flex justify-between items-center p-3 px-[2rem] bg-white">
      <section className="flex gap-[5rem] w-full items-center">
        <h2 className="whitespace-nowrap text-lg">Snap-hive</h2>
        {/* <Input
          className="md:w-[50%] w-[40%] bg-white"
          placeholder="Search friends here"
        ></Input> */}
      </section>
      <section className="flex gap-2 items-center">
        {/* <Avatar>
          <AvatarImage src={profileImage.length > 0 ? profileImage : 'https://github.com/shadcn.png'}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <p className="font-medium">{userName}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </section>
    </div>
  );
};

export default Header;
