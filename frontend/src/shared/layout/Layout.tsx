import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f4]">
      <Header />
      <div className="flex-1 flex h-0 flex-grow overflow-auto">
        <main className="w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
