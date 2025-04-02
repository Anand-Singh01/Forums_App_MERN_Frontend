import { QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./index.css";
import Feed from "./pages/HomePage/components/feed/Feed";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterForm from "./pages/registerPage/components/RegisterForm";
import ProtectedRoutes from "./shared/protectedRoute/ProtectedRoutes";
import { queryClient } from "./state/tanstack/queryClient";
import routes from "./utils/routes";
import LikedPostsPage from "./pages/HomePage/components/likedPosts/LikedPostsPage";


axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const App = () => {
  
  const location = useLocation(); 
  let currentElement: ReactNode = null;
  switch (location.pathname) {
    case "/":
      currentElement = <Feed />;
      break;
    case "/liked":
      currentElement = <LikedPostsPage />;
      break;
    default:
      currentElement = null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen">
        <ToastContainer/>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterForm />} />
          <Route path={routes.home} element={<ProtectedRoutes />}>

          <Route path={location.pathname} element={<HomePage Element={currentElement!} />} />
            


          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
