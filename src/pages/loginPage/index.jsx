import React from 'react'
import {
  Box
,Typography,useTheme,useMediaQuery} from '@mui/material'
import Form from './Form'


function LoginPage() {

  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  
  return (
    <Box>
      <Typography
        fontWeight="bold"
        fontSize="32px"
        color="primary"
      ></Typography>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m='2rem auto'
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{
          mb:"1.5rem"
        }}>
          Welcome to Wallet!
</Typography>
        <Form/>

      </Box>
    </Box>
  );
}

export default LoginPage