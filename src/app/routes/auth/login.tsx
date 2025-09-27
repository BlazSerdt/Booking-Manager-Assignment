import { AuthLayout} from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from 'primereact/checkbox';
import { Button } from "primereact/button";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from "primereact/inputicon";
import { Link } from "react-router";
import {type SubmitHandler, useForm, Controller} from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage = () => {
  const defaultValues = {
    email: "",
    password: "",
    remember: false
  }

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ defaultValues });
  const onSubmit: SubmitHandler<LoginFormData> = (data) => console.log(data);

  console.log(errors);

  return (
    <AuthLayout title="Sign In" description="Sign in to access dashboard">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5" role="form" aria-label="Login form">
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
        <div className="flex items-center justify-between w-full text-sm gap-20">
          <div className="flex items-center gap-2">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  inputId="remember"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.checked)}
                />
              )}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="text-[#5472d4] hover:underline">Forgot password?</a>
        </div>
        <div className="flex flex-col w-full gap-3 items-center">
          <Button
            label="Sign In"
            type="submit"
            className="w-full"
          />
          <Link to="/register" className="underline text-sm">Don't have an account yet?</Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;