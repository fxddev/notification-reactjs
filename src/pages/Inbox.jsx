import * as React from 'react';
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
    Link
} from "react-router-dom";

function Inbox() {

    const [triggerRender, setTriggerRender] = React.useState(0);
    React.useEffect(() => {
        console.log("Inbox Dirender");

        const myTimeout = setTimeout(myGreeting, 1500);

        function myGreeting() {
            getData()
            clearTimeout(myTimeout);
        }
        // getData()

    }, [triggerRender]);


    const [dataApi, setDataApi] = React.useState([]);
    async function getData() {
        var config = {
            method: "get",
            url: `https://jsonplaceholder.typicode.com/users`
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

    return (
        <>
            <p>Inbox</p>

            {dataApi.length == 0 ?
                <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
                :
                <>
                    {
                        dataApi.map((data) =>
                            <Card sx={{ minWidth: 275 }} key={data.id}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {data.id}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {data.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* onClick={() => handleSidebarNavLink('inbox')} */}
                                    <Link to={`/inbox-details/${data.id}`}>
                                        <Button size="small">Learn More</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        )
                    }
                </>
            }
        </>
    );
}

export default Inbox;