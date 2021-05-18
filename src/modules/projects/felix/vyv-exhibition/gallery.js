import React from 'react';
import { Typography, Card, CardHeader, CardContent, CardActions, Button, makeStyles, Divider } from '@material-ui/core';

const classes = [
    {
        id: 'plameniaky',
        name: 'Plameniaky',
        desc: <></>
    },
    {
        id: 'sovy',
        name: 'Sovy',
        desc: <></>
    },
    {
        id: 'vydry',
        name: 'Vydry',
        desc: <></>
    },
    {
        id: 'vazky',
        name: 'Vážky',
        desc: <></>
    },
    {
        id: 'pandy',
        name: 'Pandy',
        desc: <></>
    },
    {
        id: 'koaly',
        name: 'Koaly',
        desc: <></>
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}))

function Gallery() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3">Triedne galérie:</Typography>
            {classes.map(cls => (
                <Card key={cls.id}>
                    <CardHeader>{cls.name}</CardHeader>
                    <Divider />
                    <CardContent>
                        {cls.desc}
                    </CardContent>
                    <CardActions>
                        <Button color="secondary" variant="contained" href={`/gallery/${cls.id}`}>
                            Prejsť do galérie
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    )
}

export default Gallery;