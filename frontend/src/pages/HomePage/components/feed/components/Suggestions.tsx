import { Button } from "../../../../../components/ui/button";

const Suggestions = () => {
  return (
    <div className="text-gray-500 p-4 rounded-md bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">You might like</h2>
        <p className="text-blue-400 font-semibold cursor-pointer">See All</p>
      </div>
      <div></div>
      <div className="space-y-5 flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                className="rounded-full"
                src="https://assets.manutd.com/AssetPicker/images/0/0/10/126/687707/Legends-Profile_Cristiano-Ronaldo1523460877263.jpg"
                alt=""
              />
            </div>
            <div>
              <p>Cristiano Ronaldo</p>
              <p className="text-[0.8rem]">15 Mutuals</p>
            </div>
          </div>
          <div>
            <Button className="shadow-md bg-[#fb64b6] hover:bg-[#d775ab] cursor-pointer">
              Follow
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                className="rounded-full"
                src="https://assets.manutd.com/AssetPicker/images/0/0/10/126/687707/Legends-Profile_Cristiano-Ronaldo1523460877263.jpg"
                alt=""
              />
            </div>
            <div>
              <p>Cristiano Ronaldo</p>
              <p className="text-[0.8rem]">15 Mutuals</p>
            </div>
          </div>
          <div>
            <Button className="shadow-md bg-[#fb64b6] hover:bg-[#d775ab] cursor-pointer">
              Follow
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                className="rounded-full"
                src="https://assets.manutd.com/AssetPicker/images/0/0/10/126/687707/Legends-Profile_Cristiano-Ronaldo1523460877263.jpg"
                alt=""
              />
            </div>
            <div>
              <p>Cristiano Ronaldo</p>
              <p className="text-[0.8rem]">15 Mutuals</p>
            </div>
          </div>
          <div>
            <Button className="shadow-md bg-[#fb64b6] hover:bg-[#d775ab] cursor-pointer">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
