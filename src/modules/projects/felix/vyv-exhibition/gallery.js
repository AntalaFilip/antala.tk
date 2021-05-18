import React from 'react';
import { Typography, Card, CardContent, CardActions, Button, makeStyles, Divider } from '@material-ui/core';

const clss = [
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

    },
    header: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    cards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        marginLeft: theme.spacing(1),
    }
}))

function Gallery() {
    const classes = useStyles();

    console.log(clss);

    return (
        <div className={classes.root}>
            <Typography className={classes.header} variant="h3">Triedne galérie:</Typography>
            <div className={classes.cards}>
                {clss.map(cls => (
                    <Card key={cls.id} className={classes.card} raised>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                {cls.name}
                            </Typography>
                            <Divider />
                            <Typography>
                                {cls.desc}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="secondary" variant="contained" href={`/projects/felix/vyv-exhibition/gallery/${cls.id}`}>
                                Prejsť do galérie
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Gallery;