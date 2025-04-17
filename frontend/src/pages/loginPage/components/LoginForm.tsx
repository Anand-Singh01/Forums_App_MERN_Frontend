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
    control,
  } = useForm<IUserLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IUserLogin> = (data) => {
    onFormSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto space-y-6 border 
      border-gray-200 rounded-xl p-8 shadow-sm bg-white"
    >
      <div className="text-center space-y-2">
        <p className="text-gray-600 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      <div className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="your@email.com"
                className={`w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } px-4 py-2 text-base focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required"
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white 
        py-3 rounded-lg font-medium transition duration-200 disabled:opacity-50 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoaderSpinner />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <div className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;