import React, { useState } from 'react';
import { ThemeProvider, createTheme, Container, Typography, Grid, CssBaseline, Button, GlobalStyles, Paper } from '@mui/material';
import SourceForm from './components/SourceForm';
import SourceList from './components/SourceList';
import LanguageSelector from './components/LanguageSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingAnimation from './components/LoadingAnimation';
import { fetchNews } from './api';

// Define the type for a source
interface Source {
  id: number;
  url: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const [sources, setSources] = useState<Source[]>([
    { id: 1, url: 'https://twitter.com/reactjs' },
    { id: 2, url: 'https://news.ycombinator.com' },
  ]);
  const [language, setLanguage] = useState<string>('en');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const handleAddSource = (url: string) => {
    const newSource: Source = {
      id: Date.now(),
      url,
    };
    setSources([...sources, newSource]);
  };

  const handleDeleteSource = (id: number) => {
    setSources(sources.filter(source => source.id !== id));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      const newsResult = await fetchNews(sources, language);
      setResult(newsResult);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setResult("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            News Aggregator
          </Typography>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>Add a new source</Typography>
              <SourceForm onAdd={handleAddSource} />
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>Sources</Typography>
              <SourceList sources={sources} onDelete={handleDeleteSource} />
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>Language</Typography>
              <LanguageSelector language={language} onLanguageChange={setLanguage} />
            </Grid>
            <Grid xs={12} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerate}
                disabled={loading}
                fullWidth
                size="large"
              >
                Generate News
              </Button>
            </Grid>
            <Grid xs={12}>
              {loading ? <LoadingAnimation /> : <ResultDisplay result={result} />}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;