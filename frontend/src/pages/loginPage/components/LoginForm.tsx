import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { IUserLogin } from "../../../shared/interfaces";

interface ILoginFormProps {
  isLoading: boolean;
  onFormSubmit: (data: IUserLogin) => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ isLoading, onFormSubmit }) => {
  const {
    formState: { errors },
    handleSubmit,
    control, // Use control for Controller
  } = useForm<IUserLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IUserLogin> = (data) => {
    console.log("Form Data:", data);
    onFormSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-center space-y-3 border-[1px] rounded-lg lg:w-[20%] p-5"
      action=""
    >
      <div className="space-y-1">
        <Label>Email</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            minLength: { value: 5, message: "Email is too short" },
          }}
          render={({ field }) => (
            <Input
              {...field} 
              type="email"
              placeholder="email"
              className=""
            />
          )}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Password</Label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: { value: 1, message: "Password must be at least 6 characters long" },
          }}
          render={({ field }) => (
            <Input
              {...field} 
              type="password"
              placeholder="password"
              className=""
            />
          )}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <Button type="submit" className="cursor-pointer" disabled={isLoading}>
        {isLoading ? <LoaderSpinner /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;