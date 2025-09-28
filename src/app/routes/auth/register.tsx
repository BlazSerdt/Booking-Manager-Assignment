import { AuthLayout } from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useNavigate } from "react-router";

const registerSchema = z.object({
  displayName: z
    .string()
    .min(6, "Display name must be at least 6 characters")
    .max(32, "Display name cannot be longer than 32 characters")
    .regex(/^[A-Za-z0-9]+$/, "Display name can only contain letters and numbers"),
  email: z.email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot be longer than 32 characters"),
})

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const defaultValues = {
    displayName: "",
    email: "",
    password: ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: defaultValues,
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try{
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if(response.status !== 201){
        const error = await response.json();

        toast.current?.show({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error.message,
          life: 2000
        });

        return;
      }

      toast.current?.show({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'Redirecting to login...',
        life: 2000
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch(error){
      console.log("network error: ", error);
    }
  }

  return (
    <AuthLayout title="Register" description="Create an account as a Tenant Admin">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 " role="form" aria-label="Register form">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="displayName">Display Name</label>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <IconField>
                <InputIcon className="pi pi-user" />
                <InputText
                  {...field}
                  id="displayName"
                  type="text"
                  placeholder="Display name*"
                  aria-invalid={!!errors.displayName}
                  invalid={!!errors.displayName}
                />
              </IconField>
            )}
          />
          {errors.displayName && (
            <small id="displayName-error" className="text-red-500">
              {errors.displayName.message}
            </small>
          )}
        </div>
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