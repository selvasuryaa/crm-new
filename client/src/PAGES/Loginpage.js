import React from "react"
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "../CSS/loginpage.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
function Loginpage(){

    const classes = useStyles();

    return(
        <div id="loginpage">
             <form className={classes.root} noValidate autoComplete="off">
     
                    <TextField id="outlined-basic" label="Username" variant="outlined" name="name"  />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
                    <Button variant="contained" color="primary" type="submit">Login</Button>
        </form>
        </div>
    )
}

export default Loginpage;