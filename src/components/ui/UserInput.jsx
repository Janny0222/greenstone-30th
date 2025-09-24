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
        className={ `text-black font-semibold text-lg`}
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

export const Select = ({ options, name, label, onChange, value }) => {
  return (
    <div className="text-sm w-full">
      <label htmlFor={name} className="font-semibold text-lg">
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className="w-full text-sm mt-1 p-2 border border-border rounded text-black bg-white"
      >
        <option value="" disabled>
          Select Role
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};