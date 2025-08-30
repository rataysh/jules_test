import React from 'react';

interface ResultDisplayProps {
  result: string;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="p-4 mt-2 min-h-[100px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        Generated News
      </h2>
      <pre className="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
        {result || 'Click "Generate News" to see the result.'}
      </pre>
    </div>
  );
}