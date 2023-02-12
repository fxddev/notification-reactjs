import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// kalo error pake Switch ganti ke Routes

import Inbox from './pages/Inbox'
import SendEmail from './pages/SendEmail'
import Starred from './pages/Starred'

import './styles/MyRoutes.css'

import { PageCurrentlyStore } from "./MyStore";


function MyRoutes(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const [halamanBaruDirefresh, setHalamanBaruDirefresh] = React.useState(true);
    const [pageCurrently, setPageCurrently] = React.useState("inbox");
    // const [trickyStopSetPageCurrently, setTrickyStopSetPageCurrently] = React.useState(0);

    // let page_skrng = "inbox"

    const [triggerRender, setTriggerRender] = React.useState(0);
    React.useEffect(() => {
        console.log("MyRoutes Dirender");

        // console.log("menerima props.PageCurrently");
        // console.log(props.PageCurrently);
        // if (props.PageCurrently != 'inbox') {
        //     setTrickyStopSetPageCurrently(trickyStopSetPageCurrently + 1)
        //     console.log("trickyStopSetPageCurrently");
        //     console.log(trickyStopSetPageCurrently);

        //     if (trickyStopSetPageCurrently < 2) {
        //         setPageCurrently(props.PageCurrently)
        //         // page_skrng = props.PageCurrently
        //         console.log("sdg set page_skrng");
        //     }
        // }
        // pake props malah tetep di home padahal refreshnya pas halaman selain home

        PageCurrentlyStore.subscribe((receive) => {
            // if (receive_id !== 0) {
            // setId(receive_id);
            // }
            console.log("receive pathArray[1] dari store");
            console.log(receive);

            if (receive != 'inbox') {

                // page_skrng = receive

                if (receive !== 0) {
                    setPageCurrently(receive)
                }
            }
        });
        // pake ini (store) work

    }, [triggerRender]);

    // PageCurrentlyStore.subscribe((receive) => {
    //     // if (receive_id !== 0) {
    //     // setId(receive_id);
    //     // }
    //     console.log("receive");
    //     console.log(receive);

    //     if (receive != 'inbox') {
    //         // setPageCurrently(receive)
    //         page_skrng = receive
    //     }
    // });

    function handleSometing(statusPage) {
        // setTriggerRender(triggerRender + 1)

        // setHalamanBaruDirefresh(false)

        console.log(`page sekarang ${statusPage}`);
        setPageCurrently(statusPage)

        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <Link to="/" className="_nav" onClick={() => handleSometing('inbox')}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Inbox"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/send-email" className="_nav" onClick={() => handleSometing('send-email')}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"send-email"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Responsive drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />

                    {/* <Routes>
                        <Route path="/" element={<Inbox />} />
                        <Route path="/send-email" element={<SendEmail />} />
                    </Routes> */}

                    {/* <Switch>
                        <Route path="/" exact component={Inbox} />
                        <Route path="/send-email" component={SendEmail} />
                    </Switch> */}
                    {/* klo pake switch ga realtime berubahnya */}

                    {/* {halamanBaruDirefresh ?
                        <>
                            {page_skrng == 'inbox' ?
                                <Inbox />
                                :
                                <SendEmail />
                            }
                        </>
                        :
                        <>
                            {pageCurrently == 'inbox' ?
                                <Inbox />
                                :
                                <SendEmail />
                            }
                        </>
                    } */}

                    {/* sekarang halaman {pageCurrently} */}
                    {pageCurrently == 'inbox' ?
                        <Inbox />
                        :
                        <SendEmail />
                    }

                    {/* <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography> */}
                </Box>
            </Box>
        </Router>
    );
}

MyRoutes.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default MyRoutes;
// export default App