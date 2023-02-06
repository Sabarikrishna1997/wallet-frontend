import React from "react";
import { Box,  useTheme } from "@mui/material";

import Siderbar from "../../components/sidebar/Siderbar";
import MainPage from "../../components/mainPage/MainPage";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const { palette } = useTheme();
  return (
    <Box>
     < Navbar/>
      <Box height={"100%"} sx={{ display: "flex" }}>
        {/* <Box width={"10%"} height="100%">
          <Siderbar />
        </Box> */}
        <Box
          width={"100%"}
          height="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop:"20px",
          }}
        >
          <MainPage />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
