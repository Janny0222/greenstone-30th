import React from "react";

export const Input = ({
  disabled,
  name,
  label,
  placeholder,
  type,
  onChange,
  value,
  navbar,
  bg,
}) => {
  return (
    <div className="text-sm w-full">
      <label
        htmlFor={name}
        className={ `text-blackfont-semibold text-lg`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={`w-full text-sm mt-1 p-2 border border-border rounded text-black`}
      />
    </div>
  );
};