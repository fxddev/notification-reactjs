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
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
import InboxDetails from './pages/InboxDetails'
import SendEmail from './pages/SendEmail'

import './styles/MyRoutes.css'

import { PageCurrentlyStore } from "./MyStore";


function MyRoutes(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const themepage_props = props.themepage
    console.log(themepage_props);
    const [themePage, setThemePage] = React.useState('dark');
    // 


    const [triggerRender, setTriggerRender] = React.useState(0);
    React.useEffect(() => {
        console.log("MyRoutes Dirender");

        setThemePage(themepage_props)
    }, [triggerRender]);

    // PageCurrentlyStore.subscribe((receive) => {
    //     // if (receive_id !== 0) {
    //     // setId(receive_id);
    //     // }
    // });

    function handleTheme(themeProps) {

        let opposite_theme = 'light'
        if (themeProps == 'light') {
            opposite_theme = 'dark'
        }
        setThemePage(opposite_theme)
        props.receivetoggle(opposite_theme);
        // https://javascript.plainenglish.io/how-to-pass-props-from-child-to-parent-component-in-react-d90752ff4d01
    }

    function handleSidebarNavLink(statusPage) {
        // console.log(`page sekarang ${statusPage}`);

        // biar auto close sidebar ketika mode mobile
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
                <Link to="/" className="_nav" onClick={() => handleSidebarNavLink('inbox')}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Inbox"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/send-email" className="_nav" onClick={() => handleSidebarNavLink('send-email')}>
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
                        <div className='my__topbar'>
                            <Typography variant="h6" noWrap component="div">
                                Responsive drawer
                            </Typography>
                            <IconButton color="inherit" aria-label="toggle theme" onClick={() => handleTheme(themePage)}>
                                {/* https://mui.com/material-ui/icons/ */}
                                {/* https://mui.com/material-ui/material-icons/?query=dark&selected=DarkMode */}

                                {themePage == 'dark' ?
                                    <Brightness7Icon />
                                    :
                                    <DarkModeIcon />
                                }

                            </IconButton>
                        </div>
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

                    <Switch>
                        <Route path="/" exact component={Inbox} />
                        <Route path="/inbox-details/:slug" component={InboxDetails} />
                        <Route path="/send-email" component={SendEmail} />
                    </Switch>
                    {/* klo pake switch ga realtime berubahnya */}

                    
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
