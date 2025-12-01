import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

async function registerUser(data) {
  const res = await fetch(`${API_BASE}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Registration failed");
  return body;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(registerUser);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card flex flex-col md:flex-row items-stretch gap-6">
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>
          <p className="muted">
            Join now to access the demo application. We only save your email and
            a hashed password.
          </p>
        </div>

        <div className="md:w-1/2 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Invalid email",
                  },
                })}
                className="form-input mt-1"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="form-input mt-1"
                placeholder="Enter a password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full bg-white text-indigo-700 font-semibold py-2 rounded-lg hover:opacity-95 disabled:opacity-60"
              >
                {mutation.isLoading ? "Registering..." : "Sign Up"}
              </button>
            </div>

            {mutation.isError && (
              <p className="text-red-600 text-sm">{mutation.error.message}</p>
            )}
            {mutation.isSuccess && (
              <p className="text-green-600 text-sm">{mutation.data.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
