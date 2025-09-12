import React from 'react';
import { useNavigate } from 'react-router-dom';

const variantStyles = {
  default: 'bg-gray-500 hover:bg-gray-600 text-white',
  edit: 'bg-blue-500 hover:bg-blue-600 text-white',
  delete: 'bg-red-500 hover:bg-red-600 text-white',
  save: 'bg-green-500 hover:bg-green-600 text-white',
  signin: 'bg-indigo-500 hover:bg-indigo-600 text-white',
  signup: 'bg-purple-500 hover:bg-purple-600 text-white',
};

const Button = ({ title, onClick, variant = 'default' }) => {
  const navigate = useNavigate();

  const buttonClass = `
    ${variantStyles[variant] || variantStyles.default}
    px-4 py-2 rounded-md text-sm font-medium 
    focus:outline-none transition duration-200
  `;

  return (
    <button onClick={onClick} className={buttonClass}>
      {title}
    </button>
  );
};

export default Button;
