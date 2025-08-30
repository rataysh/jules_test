import React from 'react';
import { Source } from '../../../domain/entities/source';
import { ListItem } from '../molecules/ListItem';

interface SourceListProps {
  sources: Source[];
  onDelete: (id: number) => void;
}

export function SourceList({ sources, onDelete }: SourceListProps) {
  return (
    <div className="flex flex-col gap-2">
      {sources.map((source) => (
        <ListItem
          key={source.id}
          text={source.url}
          onDelete={() => onDelete(source.id)}
        />
      ))}
    </div>
  );
}