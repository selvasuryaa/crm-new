import { Button, Modal, Typography } from "@material-ui/core";
import React from "react"
import { useNavigate } from "react-router-dom";
import Authservice from "../SERVICES/Authservice";


const LogoutScreen = (props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    Authservice.logout()
    navigate('/')
  }
  return (
    <div style={{ style: 'grid', placeContent: 'center', height: '100vh', textAlign: 'center', marginTop: '190px' }}>
      <Button variant="contained" color="primary" onClick={logoutHandler}>Logout</Button>
    </div>
  )
};

export default LogoutScreen;
