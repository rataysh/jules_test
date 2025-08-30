import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Source {
  id: number;
  url: string;
}

interface SourceListProps {
  sources: Source[];
  onDelete: (id: number) => void;
}

export function SourceList({ sources, onDelete }: SourceListProps) {
  return (
    <List>
      {sources.map((source) => (
        <ListItem
          key={source.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(source.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={source.url} />
        </ListItem>
      ))}
    </List>
  );
};