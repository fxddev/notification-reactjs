import * as React from 'react';

import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MyRoutes from './MyRoutes'

// import { PageCurrentlyStore } from "./MyStore";

function App() {

  const [themePage, setThemePage] = React.useState('dark');
  const theme = createTheme({ palette: { mode: themePage } });
  // light atau dark

  React.useEffect(() => {
    console.log("App Dirender");

    //   console.log("sdg passing pathArray[1] ke store");
    //   console.log(pathArray[1]);
    //   PageCurrentlyStore.update((send) => pathArray[1]);

  }, []);

  const myTimeout = setTimeout(myGreeting, 5000);

  function myGreeting() {
    setThemePage('light')
    clearTimeout(myTimeout);
  }

  const handle_receivedata = (data) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <MyRoutes receivedata={handle_receivedata} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
