import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import Input from "../components/Input";
import Button from "../components/Button";
import FormWrapper from "../components/FormWrapper";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const mutation = useRegister();

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onError: (error) => {
        const msg = error?.message || "Registration failed";
        // If server says email exists, attach error to email field
        if (/email/i.test(msg) || msg.includes("Email")) {
          setError("email", { type: "server", message: msg });
        }
      },
    });
  };

  return (
    <FormWrapper>
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>
          <p className="muted">
            Join now to access the demo application. We only save your email and
            a hashed password.
          </p>
        </div>

        <div className="md:w-1/2 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email",
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter a password"
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              error={errors.password?.message}
            />

            <div>
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Registering..." : "Sign Up"}
              </Button>
            </div>

            {mutation.isError && (
              <p className="text-red-600 text-sm">
                {mutation.error?.message || "Registration failed"}
              </p>
            )}
            {mutation.isSuccess && (
              <p className="text-green-600 text-sm">{mutation.data?.message}</p>
            )}
          </form>
        </div>
      </div>
    </FormWrapper>
  );
}
