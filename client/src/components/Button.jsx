import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-700 hover:bg-slate-800 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white",

    outline:
      "border border-gray-300 hover:bg-gray-100 text-gray-800",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        rounded-lg
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {leftIcon}

      {loading ? (
        <>
          <span className="animate-spin">⟳</span>
          Processing...
        </>
      ) : (
        children
      )}

      {rightIcon}
    </button>
  );
};

export default Button;
