import './App.css';

import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'

import theme from './theme';
import MainRouter from './MainRouter';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
