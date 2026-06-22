import React from "react";

const Loader = ({
  size = "md",
  fullScreen = false,
  text = "Loading...",
  color = "blue",
  overlay = true,
  showText = true,
  className = "",
}) => {
  const sizeMap = {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const colorMap = {
    blue: "border-t-blue-500",
    green: "border-t-green-500",
    red: "border-t-red-500",
    yellow: "border-t-yellow-500",
    purple: "border-t-purple-500",
  };

  const spinner = (
    <div
      className={`
        ${sizeMap[size]}
        border-4
        border-gray-200
        ${colorMap[color]}
        rounded-full
        animate-spin
      `}
    />
  );

  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      {spinner}

      {showText && (
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500">{text}</span>
          <span className="text-xs text-gray-400">
            Fetching latest market data
          </span>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          ${overlay ? "bg-black/30 backdrop-blur-sm" : ""}
        `}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
