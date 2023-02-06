import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import WidgetWrapper from '../WidgetWrapper'
import logo from "../../asset/pngwing.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Siderbar() {
  return (
    <WidgetWrapper
      sx={{
        height: "100%",
        padding: "0",
      }}
    >
   
   
      <Box height={"100%"}>
        <Box
          sx={{ width: "100%",paddingLeft:'10px', marginTop:"1px",  borderRadius: "25px" ,display:"flex",alignItems:"center",justifyContent:"space-between" }}
        >
          <Typography variant="h6" sx={{ color: "White" }}>
            {" "}
            Home
          </Typography>
          <ArrowForwardIosIcon sx={{ color: "White" }} />
        </Box>
      </Box>
    </WidgetWrapper>
  );
}

export default Siderbar  