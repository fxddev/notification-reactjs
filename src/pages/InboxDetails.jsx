import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function InboxDetails() {

    // https://www.youtube.com/watch?v=HhQ7XP00_D0 [dyanmicPath]
    let { slug } = useParams();

    const [triggerRender, setTriggerRender] = React.useState(0);
    React.useEffect(() => {
        console.log("Inbox Dirender");

        getData()
    }, [triggerRender]);


    const [dataApi, setDataApi] = React.useState({});
    async function getData() {
        var config = {
            method: "get",
            url: `https://jsonplaceholder.typicode.com/users/${slug}`
        };

        try {
            const resp = await axios(config);
            // const hasil = await JSON.stringify(resp.data)
            // console.log(resp);

            const data = resp.data;
            console.log(data);

            setDataApi(data)

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <p>{slug}</p>
            <p>{dataApi.name}</p>
            <p>{dataApi.website}</p>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open responsive dialog
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default InboxDetails;