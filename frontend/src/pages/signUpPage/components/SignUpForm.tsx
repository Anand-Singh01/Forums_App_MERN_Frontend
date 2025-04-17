import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { IUserRegister } from "../../../shared/interfaces";

interface ISignUpFormProps {
  isLoading: boolean;
  onFormSubmit: (data: IUserRegister) => void;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({ isLoading, onFormSubmit }) => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IUserRegister>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      dob: new Date(),
    },
  });

  const onSubmit: SubmitHandler<IUserRegister> = (data) => {
    onFormSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto space-y-6 border border-gray-200 rounded-xl p-8 shadow-lg bg-white"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-gray-600 text-sm">
          Join our community and start your journey
        </p>
      </div>

      <div className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
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
                } px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
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
                } px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* First and Last Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </Label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className={`w-full rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              )}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className={`w-full rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              )}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label
            htmlFor="userName"
            className="text-sm font-medium text-gray-700"
          >
            Username
          </Label>
          <Controller
            name="userName"
            control={control}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Username can only contain letters, numbers, and underscores",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="userName"
                type="text"
                placeholder="johndoe123"
                className={`w-full rounded-lg border ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                } px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            )}
          />
          {errors.userName && (
            <p className="text-sm text-red-500">{errors.userName.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
            Date of Birth
          </Label>
          <Controller
            name="dob"
            control={control}
            rules={{
              required: "Date of birth is required",
              validate: (value) => {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 13) return "You must be at least 13 years old";
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                id="dob"
                type="date"
                value={field.value ? field.value.toISOString().split("T")[0] : ""}
                onChange={(e) => field.onChange(new Date(e.target.value))}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full rounded-lg border ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                } px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            )}
          />
          {errors.dob && (
            <p className="text-sm text-red-500">{errors.dob.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200 disabled:opacity-50 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoaderSpinner />
            Creating account...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;