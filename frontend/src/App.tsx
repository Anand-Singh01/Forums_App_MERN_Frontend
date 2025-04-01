import { QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { ReactNode, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import ViewPostContainer from "./pages/HomePage/components/feed/components/ViewPostContainer";
import Feed from "./pages/HomePage/components/feed/Feed";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterForm from "./pages/registerPage/components/RegisterForm";
import ModalManager from "./shared/components/ModalManager";
import ProtectedRoutes from "./shared/protectedRoute/ProtectedRoutes";
import { useAppSelector } from "./state/hooks";
import queryClient from "./state/tanstack/queryClient";
import routes from "./utils/routes";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const App = () => {
  const { isSelectedPostOnFeedVisible } = useAppSelector((state) => ({
    isSelectedPostOnFeedVisible: state.postSlice.selectedPostIdOnFeed !== null,
  }));

  let modalComponent: React.FC | null = null;

  switch (true) {
    case isSelectedPostOnFeedVisible:
      modalComponent = ViewPostContainer;
      break;
    default:
      modalComponent = null;
  }

  useEffect(() => {
    const isVisible = isSelectedPostOnFeedVisible;
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }
  }, [isSelectedPostOnFeedVisible]);

  const location = useLocation();
  let currentElement: ReactNode = null;

  switch (location.pathname) {
    case "/":
      currentElement = <Feed />;
      break;
    default:
      currentElement = null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen">
        <ToastContainer />
        <ModalManager isVisible={!!modalComponent} Component={modalComponent} />
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterForm />} />
          <Route path={routes.home} element={<ProtectedRoutes />}>
            <Route index element={<HomePage Element={currentElement!} />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;