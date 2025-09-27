import { AuthLayout } from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router";
import {type SubmitHandler, useForm, Controller} from "react-hook-form";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";

type RegisterFormData = {
  displayName: string,
  email: string,
  password: string
};

const RegisterPage = () => {
  const defaultValues = {
    displayName: "",
    email: "",
    password: ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({ defaultValues });
  const onSubmit: SubmitHandler<RegisterFormData> = (data) => console.log(data);

  console.log(errors);

  return (
    <AuthLayout title="Register" description="Create an account as a Tenant Admin">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 " role="form" aria-label="Register form">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="displayName">Display Name</label>
          <Controller
            name="displayName"
            control={control}
            rules={{ required: "Display name is required" }}
            render={({ field }) => (
              <IconField>
                <InputIcon className="pi pi-user" />
                <InputText
                  {...field}
                  id="displayName"
                  type="text"
                  placeholder="Display name*"
                  aria-required="true"
                  aria-label="Display name"
                />
              </IconField>
            )}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <IconField>
                <InputIcon className="pi pi-envelope" />
                <InputText
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Email address*"
                  aria-required="true"
                  aria-label="Email address"
                />
              </IconField>
            )}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Password
                {...field}
                id="password"
                placeholder="Password*"
                feedback={false}
                toggleMask
                aria-required="true"
                aria-label="Password"
              />
            )}
          />
        </div>
        <Button label="Register" type="submit" className="w-full" />
        <div className="text-center text-sm">
          <Link to="/login" className="underline">
            Already have an account? Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;