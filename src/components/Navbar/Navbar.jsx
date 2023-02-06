
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import WidgetWrapper from '../WidgetWrapper'
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate=useNavigate()
  const handler = () => {
    localStorage.removeItem("walletData");
    navigate('/login')
  }
  return (
    <WidgetWrapper>
      <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
        <Typography variant='h3'>Wallet</Typography>
        <IconButton onClick={handler}>
          <LogoutIcon/>
        </IconButton>
      </Box>
    </WidgetWrapper>
  )
}

export default Navbar