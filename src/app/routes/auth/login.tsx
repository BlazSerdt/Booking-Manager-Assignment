import { AuthLayout} from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from 'primereact/checkbox';
import { Button } from "primereact/button";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from "primereact/inputicon";
import { Link } from "react-router";
import {type SubmitHandler, useForm, Controller} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const defaultValues = {
    email: "",
    password: "",
    remember: false
  }

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: defaultValues,
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => console.log(data);

  return (
    <AuthLayout title="Sign In" description="Sign in to access dashboard">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5" role="form" aria-label="Login form">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <IconField>
                <InputIcon className="pi pi-envelope" />
                <InputText
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Email address*"
                  aria-invalid={!!errors.email}
                  invalid={!!errors.email}
                />
              </IconField>
            )}
          />
          {errors.email && (
            <small id="email-error" className="text-red-500">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password
                {...field}
                id="password"
                placeholder="Password*"
                feedback={false}
                toggleMask
                aria-invalid={!!errors.password}
                invalid={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <small id="password-error" className="text-red-500">
              {errors.password.message}
            </small>
          )}
        </div>
        <div className="flex items-center justify-between w-full text-sm gap-20">
          <div className="flex items-center gap-2">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  inputId="remember"
                  checked={!!field.value}
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