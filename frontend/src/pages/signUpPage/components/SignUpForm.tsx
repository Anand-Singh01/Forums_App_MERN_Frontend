import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import Input from "../../../components/ui/signUpInput";
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
    control, // Use control for Controller
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
    console.log("Form Data:", data);
    onFormSubmit(data);
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto space-y-4 border border-gray-200 rounded-2xl p-6 shadow-md bg-white"
      action=""
    >
      <h2 className="text-xl font-semibold text-center">Create an Account</h2>

      <div className="space-y-1">
        <Label  className="text-sm font-medium text-gray-700">Email</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            minLength: { value: 5, message: "Email is too short" },
          }}
          render={({ field }) => (
            <Input
              {...field}type="email" placeholder="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"

              
            />
          )}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <Label  className="text-sm font-medium text-gray-700">Password</Label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: { value: 1, message: "Password must be at least 6 characters long" },
          }}
          render={({ field }) => (
            <Input {...field} type="password" placeholder="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            />
          )}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>


  {/* First Name */}
  <div className="space-y-1">
    <Label  className="text-sm font-medium text-gray-700">First Name</Label>
    <Controller
      name="firstName"
      control={control}
      rules={{
        required: "First name is required",
      }}
      render={({ field }) => (
        <Input {...field} type="text" placeholder="First Name"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
 />
      )}
    />
    {errors.firstName && <p>{errors.firstName.message}</p>}
  </div>

  {/* Last Name */}
  <div className="space-y-1">
    <Label  className="text-sm font-medium text-gray-700">Last Name</Label>
    <Controller
      name="lastName"
      control={control}
      rules={{
        required: "Last name is required",
      }}
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Last Name" 
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
      )}
    />
    {errors.lastName && <p>{errors.lastName.message}</p>}
  </div>

  {/* Username */}
  <div className="space-y-1">
    <Label  className="text-sm font-medium text-gray-700">Username</Label>
    <Controller
      name="userName"
      control={control}
      rules={{
        required: "Username is required",
      }}
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Username" 
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
        
      )}
    />
    {errors.userName && <p>{errors.userName.message}</p>}
  </div>

  {/* Date of Birth */}
  
  <div className="space-y-1">
    <Label  className="text-sm font-medium text-gray-700" >Date of Birth</Label>
    <Controller
      name="dob"
      control={control}
      rules={{
        required: "Date of birth is required",
      }}
      render={({ field }) => (
        <Input type="date" value={field.value ? field.value.toISOString().split('T')[0] : ""} 
        onChange={(e) => field.onChange(new Date(e.target.value))}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    />
    {errors.dob && <p className="text-sm text-red-500"> {errors.dob.message}</p>}
  </div>

  <Button type="submit" 
  className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50" 
  disabled={isLoading}>
    {isLoading ? <LoaderSpinner /> : "SignUp"}
  </Button>
</form>
     
  );
};

export default SignUpForm;