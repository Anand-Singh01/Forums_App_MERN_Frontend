import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";
import { IUserLogin } from "../../shared/interfaces";
import { useAppDispatch } from "../../state/hooks";
import { updateUserInfoAndAuth } from "../../state/slices/userInfoSlice";
import routes from "../../utils/routes";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserLogin) => loginApi(data),
    onSuccess:async(responseData)=>{
      if(responseData){
        dispatch(updateUserInfoAndAuth({
          data: responseData,
          isAuthenticated: true
        }));
        navigate(routes.home);
      }
    }
  });

  const sendForm = (data: IUserLogin) => {
    mutate(data);
  };
  return (
    <div className="flex justify-center items-center size-full">
      <LoginForm onFormSubmit={sendForm} isLoading={isPending} />
    </div>
  );
};

export default LoginPage;
