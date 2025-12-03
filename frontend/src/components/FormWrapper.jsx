import React from "react";

export default function FormWrapper({ children }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="card p-6">{children}</div>
    </div>
  );
}
