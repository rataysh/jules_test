import React from 'react';
import { Button } from '../atoms/Button';

interface ListItemProps {
  text: string;
  onDelete: () => void;
}

export function ListItem({ text, onDelete }: ListItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
      <span>{text}</span>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}
