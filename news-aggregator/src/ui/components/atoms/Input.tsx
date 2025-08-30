import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md',
        'border border-gray-300 dark:border-gray-700',
        'bg-white dark:bg-gray-800',
        'text-black dark:text-white',
        'focus:outline-none focus:ring-2 focus:ring-blue-500'
      )}
    />
  );
}
