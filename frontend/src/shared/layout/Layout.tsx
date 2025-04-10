import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700">
      {showHeader && <Header />}
      <div className="flex-1 flex h-0 flex-grow overflow-auto">
        <main className="w-full">{children}</main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;