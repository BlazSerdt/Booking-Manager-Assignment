import { AuthLayout } from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Password Reset" description="Enter the email address linked to your account to receive a reset link">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <InputText
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <Button
          label="Send Reset Link"
          icon="pi pi-envelope"
          onClick={(e) => e.preventDefault()}
        />
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;