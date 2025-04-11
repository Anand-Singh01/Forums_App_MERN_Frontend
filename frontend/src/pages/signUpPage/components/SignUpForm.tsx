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


  {/* First Name */}
  <div className="space-y-1">
    <Label>First Name</Label>
    <Controller
      name="firstName"
      control={control}
      rules={{
        required: "First name is required",
      }}
      render={({ field }) => (
        <Input {...field} type="text" placeholder="First Name" />
      )}
    />
    {errors.firstName && <p>{errors.firstName.message}</p>}
  </div>

  {/* Last Name */}
  <div className="space-y-1">
    <Label>Last Name</Label>
    <Controller
      name="lastName"
      control={control}
      rules={{
        required: "Last name is required",
      }}
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Last Name" />
      )}
    />
    {errors.lastName && <p>{errors.lastName.message}</p>}
  </div>

  {/* Username */}
  <div className="space-y-1">
    <Label>Username</Label>
    <Controller
      name="userName"
      control={control}
      rules={{
        required: "Username is required",
      }}
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Username" />
      )}
    />
    {errors.userName && <p>{errors.userName.message}</p>}
  </div>

  {/* Date of Birth */}
  <div className="space-y-1">
    <Label>Date of Birth</Label>
    <Controller
      name="dob"
      control={control}
      rules={{
        required: "Date of birth is required",
      }}
      render={({ field }) => (
        <Input {...field} type="date" value={field.value ? field.value.toISOString().split('T')[0] : ''} />
      )}
    />
    {errors.dob && <p>{errors.dob.message}</p>}
  </div>

  <Button type="submit" className="cursor-pointer" disabled={isLoading}>
    {isLoading ? <LoaderSpinner /> : "SignUp"}
  </Button>
</form>
     
  );
};

export default SignUpForm;