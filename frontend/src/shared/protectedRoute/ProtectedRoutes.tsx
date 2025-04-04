import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { checkAuthApi } from "../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateAuth, updateUserInfo } from "../../state/slices/userInfoSlice";
import routes from "../../utils/routes";
import LoaderSpinner from "../components/LoaderSpinner";
import { IUserInfo } from "../interfaces";
import Layout from "../layout/Layout";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.userInfoSlice.auth.isAuthenticated
  );
  const dispatch = useAppDispatch();

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuthApi,
    staleTime: 0,
    enabled: !isAuthenticated,
    retry: 2,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(updateUserInfo(data as IUserInfo));
      dispatch(updateAuth(true));
    }
  }, [data, dispatch, isSuccess]);

  useEffect(() => {
    if (isError && !isAuthenticated) {
      navigate(routes.login, { replace: true });
    }
  }, [isError, isAuthenticated, navigate]);

  if (isLoading && !isAuthenticated) {
    return <LoaderSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoutes;