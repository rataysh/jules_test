import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SourceFormProps {
  onAdd: (url: string) => void;
}

const SourceForm: React.FC<SourceFormProps> = ({ onAdd }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAdd(url);
    setUrl('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="New Source URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
};

export default SourceForm;
