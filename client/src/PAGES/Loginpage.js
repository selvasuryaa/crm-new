import React, { useState } from "react"
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


function Loginpage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(username, password)

  }

  return (
    <form noValidate autoComplete="off" className="form-register" style={classes.root} >
      <TextField id="outlined-basic" disableRipple label="Username" variant="outlined" name="username" onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" disableRipple variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" type="submit" onClick={submitHandler}>Login</Button>
    </form>
  )
}

export default Loginpage;