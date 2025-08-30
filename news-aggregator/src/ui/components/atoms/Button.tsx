import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md font-semibold text-white',
        'bg-blue-500 hover:bg-blue-600',
        'disabled:bg-gray-400 disabled:cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );
}
