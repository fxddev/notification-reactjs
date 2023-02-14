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

  // const myTimeout = setTimeout(myGreeting, 5000);

  // function myGreeting() {
  //   setThemePage('light')
  //   clearTimeout(myTimeout);
  // }

  const handle_receivetoggle = (data) => {
    // console.log(data);
    setThemePage(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <MyRoutes themepage={themePage} receivetoggle={handle_receivetoggle} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
