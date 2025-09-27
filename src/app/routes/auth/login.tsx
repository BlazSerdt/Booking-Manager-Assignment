import { AuthLayout} from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from 'primereact/checkbox';
import { Button } from "primereact/button";
import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, remember });

    setEmail("");
    setPassword("");
    setRemember(false);
  };

  return (
    <AuthLayout title="Sign In" description="Sign in to access dashboard">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5" role="form" aria-label="Login form">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-label="Email address"
            className="w-full"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            placeholder="Password"
            feedback={false}
            toggleMask
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
            aria-label="Password"
          />
        </div>
        <div className="flex items-center justify-between w-full text-sm gap-20">
          <div className="flex items-center gap-2">
            <Checkbox
              inputId="remember"
              checked={remember}
              onChange={(e) => setRemember(e.checked!)}
              aria-checked={remember}
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