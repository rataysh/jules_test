import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language}
        label="Language"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        <MenuItem value="de">German</MenuItem>
        <MenuItem value="ru">Russian</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
