import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../api/authApi";
import { IUserRegister } from "../../shared/interfaces";
import { useAppDispatch } from "../../state/hooks";
import { updateUserInfoAndAuth } from "../../state/slices/userInfoSlice";
import routes from "../../utils/routes";
import SignUpForm from "./components/SignUpForm";

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserRegister) => signUpApi(data),
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

  const sendForm = (data: IUserRegister) => {
    mutate(data);
  };
  return (
    <div className="flex justify-center items-center size-full">
      <SignUpForm onFormSubmit={sendForm} isLoading={isPending} />
    </div>
  );
};

export default SignUpPage;