import React, { ReactNode } from "react";
import LeftSideBar from "./components/LeftSideBar";

interface IHomePageProps {
  Element: ReactNode;
}

const HomePage: React.FC<IHomePageProps> = ({ Element }) => {
  return (
    <section className="flex gap-[2rem] h-full w-full">
      <LeftSideBar />
      <main className="flex-1">{Element}</main>
      {/* <RightSideBar /> */}
    </section>
  );
};

export default HomePage;