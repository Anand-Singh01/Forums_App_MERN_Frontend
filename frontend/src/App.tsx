import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Feed from "./pages/HomePage/components/feed/Feed";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterForm from "./pages/registerPage/components/RegisterForm";
import ProtectedRoutes from "./shared/protectedRoute/ProtectedRoutes";
import routes from "./utils/routes";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const App = () => {
  
  const queryClient = new QueryClient();
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
