import React from "react";

const Input = React.forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-800">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input mt-1 ${className}`}
          {...props}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
