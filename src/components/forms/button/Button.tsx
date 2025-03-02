import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2";

  const variantStyles = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
