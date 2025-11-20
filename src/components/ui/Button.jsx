import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text = "Button",
  icon = null,
  onClick,
  type = "button",
  variant = 1,
  disabled = false,
  className = "",
}) => {
  const getButtonClass = () => {
    // Base classes shared by all variants
    const baseClasses = "px-6 py-3 rounded-xl flex justify-center items-center gap-2 font-medium transition duration-300";

    if (disabled) {
      return `${baseClasses} bg-gray-300 text-white border border-gray-300 cursor-not-allowed shadow-none`;
    }

    const variants = {
      // Save and update button
      1: `${baseClasses} bg-[#CCA547] text-white cursor-pointer shadow-md 
          hover:bg-[#CCA547]/90 hover:shadow-lg active:scale-95`,

      // Cancel button
      2: `${baseClasses} border border-[#CCA547] text-[#CCA547] cursor-pointer 
          hover:bg-[#CCA547] hover:shadow-lg hover:text-white active:scale-95`,

      // Approve button
      3: `${baseClasses} bg-green-600 text-white cursor-pointer shadow-md 
          hover:bg-green-700 hover:shadow-lg active:scale-95`,

      // Reject button
      4: `${baseClasses} bg-red-600 text-white cursor-pointer shadow-md 
          hover:bg-red-700 hover:shadow-lg active:scale-95`,
    };

    return variants[variant] || baseClasses;
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`text-base ${getButtonClass()} ${className}`}
      aria-disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([1, 2, 3, 4]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;