import React from 'react';

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100px]">
      <div className="animate-pulse text-lg text-gray-700 dark:text-gray-300">
        Generating news...
      </div>
    </div>
  );
}