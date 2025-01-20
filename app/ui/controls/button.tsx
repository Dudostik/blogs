import React from "react";

interface SubmitButtonProps {
  label: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export const Button: React.FC<SubmitButtonProps> = ({ label, type }) => {
  return (
    <button
      type={type ?? "button"}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
    >
      {label}
    </button>
  );
};
