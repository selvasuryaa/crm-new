import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  boxIcon:{
    display:"flex",
    width:81,
    alignItems:"center",
    justifyContent:"center"
  }
}));

export default function ProfitCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  let color=props.color

  return (
    <Card className={classes.root}>
      <div>
      <Paper className={classes.boxIcon} style={{backgroundColor:color, height:"100%"}}>
        
        
          {props.icon}
        
        
        
        </Paper>
        </div>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.texthead}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.textcontent}
          </Typography>
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div> */}
      {/* </div> */}
      {/* <CardMedia
        className={classes.cover}
        
        title="Live from space album cover"
      >
        
        </CardMedia> */}
    </Card>
  );
}
