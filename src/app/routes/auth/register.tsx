import { AuthLayout } from "../../../components/layouts/auth-layout.tsx";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, displayName, password });

    setEmail("");
    setDisplayName("");
    setPassword("");
  };

  return (
    <AuthLayout title="Register" description="Create an account as a Tenant Admin">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 " role="form" aria-label="Register form">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="displayName">Display Name</label>
          <InputText
            id="displayName"
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            aria-required="true"
            aria-label="Display Name"
            className="w-full"
          />
          <small id="username-help">
            This name will be displayed to users.
          </small>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-label="Email Address"
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