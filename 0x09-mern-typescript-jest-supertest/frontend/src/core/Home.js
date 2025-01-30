import { makeStyles } from "@mui/styles";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import unicornbikeImg from './../assets/images/medical.PNG';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  }
}))

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <Typography variant='h6' className={classes.title}>
          Home Page
        </Typography>
        <CardMedia
          className={classes.media}
          image={unicornbikeImg}
          title='unicorn Bicycle'
        />
        <CardContent>
          <Typography variant='body2' component='p'>
            Welcome Home
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home;
