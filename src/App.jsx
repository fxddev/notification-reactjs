import * as React from 'react';

import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MyRoutes from './MyRoutes'

function App() {

  const theme = createTheme({ palette: { mode: 'dark' } });
  // light atau dark

  React.useEffect(() => {
    console.log("App Dirender");
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <MyRoutes />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
