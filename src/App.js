
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import { themeSettings } from './theme';
import Router from './Router';
function App() {
  const mode='dark'
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div style={{height:"100vh"}}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
