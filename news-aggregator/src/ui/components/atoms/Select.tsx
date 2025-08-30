import React from 'react';
import clsx from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md',
        'border border-gray-300 dark:border-gray-700',
        'bg-white dark:bg-gray-800',
        'text-black dark:text-white',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'w-full'
      )}
    >
      {children}
    </select>
  );
}
