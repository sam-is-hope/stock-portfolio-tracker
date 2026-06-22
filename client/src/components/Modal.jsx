import React, { useEffect } from "react";

const Modal = ({
  isOpen,
  title,
  children,
  width = "max-w-2xl",
  onClose,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      "
    >
      <div
        className={`
          bg-white
          rounded-xl
          shadow-xl
          w-full
          ${width}
          max-h-[90vh]
          overflow-y-auto
        `}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-semibold text-xl">
            {title}
          </h2>

          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
