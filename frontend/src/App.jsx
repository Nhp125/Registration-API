import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-white font-extrabold text-2xl tracking-tight"
          >
            UserApp
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-white/90 hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="text-white/90 hover:text-white">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
