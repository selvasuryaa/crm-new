import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SplineCard from './Splinecard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FaceIcon from '@material-ui/icons/Face';
import PieCard from "./Piecard"
import Combinationcard from "./Combinationcard"
import BarCard from "./Barcard"
import ProfitCard from "../PAGES/Profitcard"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
  
          {/* <Paper className={classes.paper}> */}
            <ProfitCard texthead="Profit" textcontent="1500k" color="#f50057" icon={<ShoppingCartIcon style={{fontSize:"60",color:"white"}}/>} />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={3}>
  
          {/* <Paper className={classes.paper}> */}
            <ProfitCard  texthead="Likes" textcontent="4321" color="blue" icon={<ThumbUpIcon style={{fontSize:"60",color:"white"}}/>} />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}> */}
              <ProfitCard texthead="Sales" textcontent="460" color="violet" icon={<AssessmentIcon style={{fontSize:"60",color:"white"}}/>} />

          {/* </Paper> */}
        </Grid>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}> */}
              <ProfitCard texthead="New Members" color="orange" textcontent="248" icon={<FaceIcon style={{fontSize:"60",color:"white"}}/>} />

          {/* </Paper> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}> */}
      <SplineCard style={{width:"100%"}}/>

          {/* </Paper> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}> */}
              <BarCard/>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}> */}
              <Combinationcard/>

          {/* </Paper> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}> */}
              <PieCard/>

          {/* </Paper> */}
        </Grid>
      
      </Grid>
    </div>
  );
}
