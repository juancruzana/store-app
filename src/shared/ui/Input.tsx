import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, className = "", ...props }, ref) => (
    <div className="relative w-full">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 ${leftIcon ? "pl-9" : "pl-4"} pr-4 ${className}`}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";
