import React from "react";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="card p-8 text-gray-900">
        <h1 className="text-3xl font-extrabold mb-3">
          Welcome to the User Registration Demo
        </h1>
        <p className="muted mb-6">
          Fast demo showing a registration flow with hashed passwords and a
          modern, responsive UI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/40 rounded-lg">
            <h3 className="font-semibold">Sign Up</h3>
            <p className="muted">
              Create an account quickly and see the integration between frontend
              and backend.
            </p>
          </div>
          <div className="p-4 bg-white/40 rounded-lg">
            <h3 className="font-semibold">Login</h3>
            <p className="muted">
              Use the Login page to simulate signing in (UI only in this demo).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
