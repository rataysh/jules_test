import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

interface SourceFormProps {
  onAdd: (url: string) => void;
}

export function SourceForm({ onAdd }: SourceFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAdd(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="New Source URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}