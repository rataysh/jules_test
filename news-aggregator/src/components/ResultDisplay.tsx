import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, minHeight: '100px' }}>
      <Typography variant="h6" gutterBottom>
        Generated News
      </Typography>
      <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {result || 'Click "Generate News" to see the result.'}
      </Typography>
    </Paper>
  );
};

export default ResultDisplay;
