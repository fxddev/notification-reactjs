import * as React from 'react';

import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MyRoutes from './MyRoutes'

import { PageCurrentlyStore } from "./MyStore";

function App() {

  const theme = createTheme({ palette: { mode: 'dark' } });
  // light atau dark

  const [pageCurrently, setPageCurrently] = React.useState("inbox");
  React.useEffect(() => {
    console.log("App Dirender");

    const pathArray = window.location.pathname.split('/');
    console.log(pathArray);
    // if (pathArray[1] == "") {
    //   console.log("Inbox");
    // } else {
    //   console.log(pathArray[1]);
    //   setPageCurrently(pathArray[1])
    // }
    if (pathArray[1] != "") {
      // console.log("sdg passing props PageCurrently");
      // console.log(pathArray[1]);
      // setPageCurrently(pathArray[1])
  
      console.log("sdg passing pathArray[1] ke store");
      console.log(pathArray[1]);
      PageCurrentlyStore.update((send) => pathArray[1]);
    }

  }, []);

  

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <MyRoutes PageCurrently={pageCurrently} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
