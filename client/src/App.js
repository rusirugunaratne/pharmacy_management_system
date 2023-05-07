import logo from './logo.svg';
import './App.css';
import { Router } from './routes/router';
import { darkTheme } from './themes/Themes';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (<>
    <ThemeProvider theme={darkTheme}>
      <Router></Router>
    </ThemeProvider>
  </>

  );
}

export default App;
