import { QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { ReactNode, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import ViewPostContainer from "./pages/HomePage/components/feed/components/ViewPostContainer";
import Feed from "./pages/HomePage/components/feed/Feed";
import LikedPostsPage from "./pages/HomePage/components/likedPosts/LikedPostsPage";
import SavedPostsPage from "./pages/HomePage/components/savedPosts/SavedPostsPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import Message from "./pages/Message/Message";
import ProfilePage from "./pages/ProfilePage/profilePage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import ModalManager from "./shared/components/ModalManager";
import DeletePostContainer from "./shared/components/post/DeletePostContainer";
import UpdatePostContainer from "./shared/components/post/UpdatePostContainer";
import ProtectedRoutes from "./shared/protectedRoute/ProtectedRoutes";
import { useAppSelector } from "./state/hooks";
import queryClient from "./state/tanstack/queryClient";
import routes from "./utils/routes";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const App = () => {
  const { isSelectedPostOnFeedVisible, isUpdatePostContainerVisible, isDeletePostContainerVisible } =
    useAppSelector((state) => ({
      isSelectedPostOnFeedVisible:
        state.postSlice.selectedPostIdOnFeed !== null,
      isUpdatePostContainerVisible:
        state.postSlice.selectedPostToEdit.postId !== null,
        isDeletePostContainerVisible:state.postSlice.selectedPostToDelete.postId !== null
    }));

  let modalComponent: React.FC | null = null;

  switch (true) {
    case isSelectedPostOnFeedVisible:
      modalComponent = ViewPostContainer;
      break;
    case isUpdatePostContainerVisible:
      modalComponent = UpdatePostContainer;
      break;
      case isDeletePostContainerVisible:
        modalComponent = DeletePostContainer;
        break;
    default:
      modalComponent = null;
  }

  useEffect(() => {
    const isVisible =
      isSelectedPostOnFeedVisible || isUpdatePostContainerVisible || isDeletePostContainerVisible;
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }
  }, [isDeletePostContainerVisible, isSelectedPostOnFeedVisible, isUpdatePostContainerVisible]);


  const location = useLocation();
  let currentElement: ReactNode = null;
  switch (location.pathname) {
    case "/":
      currentElement = <Feed />;
      break;
      case `/profile`:
        currentElement = <ProfilePage />;
      break;
    case "/liked":
      currentElement = <LikedPostsPage />;
      break;
    case "/saved":
      currentElement = <SavedPostsPage />;
      break;
    case "/messages":
      currentElement = <Message />;
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
          <Route path={routes.register} element={<SignUpPage />} />
          <Route path={routes.home} element={<ProtectedRoutes />}>
          <Route path={location.pathname} element={<HomePage Element={currentElement!} />}/>
          <Route path={`${routes.profile}`} element={<HomePage Element={<ProfilePage />} />} />

          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;