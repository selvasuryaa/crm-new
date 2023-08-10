import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';
import "../CSS/loginpage.css"
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    // const classes = useStyles();
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(e)
        console.log(username, password)
        navigate("/login")

    }

    return (
        <form noValidate autoComplete="off" className="form-register" >
            {/* <div > */}
                <div>

                    <TextField id="outlined-basic" disableRipple label="Username" variant="outlined" name="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>

                    <TextField label="Password" disableRipple variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>

                    <Button variant="contained" color="primary" type="submit" onClick={submitHandler}>Register</Button>
                </div>
            {/* </div> */}
        </form>
    )
}

export default RegisterPage;