import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../components/FormWrapper";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../api/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    setMessage(null);
    try {
      const res = await loginUser(data);
      setMessage({
        type: "success",
        text: res?.message || "Đăng nhập thành công",
      });
    } catch (err) {
      const msg = err?.message || "Đăng nhập thất bại";
      // attach credential errors to password field if related
      if (/mật khẩu|password|credentials|email/i.test(msg)) {
        setError("password", { type: "server", message: msg });
      } else if (/email/i.test(msg)) {
        setError("email", { type: "server", message: msg });
      } else {
        setMessage({ type: "error", text: msg });
      }
    }
  };

  return (
    <FormWrapper>
      <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          placeholder="you@example.com"
          {...register("email", { required: "Email required" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          {...register("password", { required: "Password required" })}
          error={errors.password?.message}
        />

        <div>
          <Button type="submit">Login</Button>
        </div>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </FormWrapper>
  );
}
