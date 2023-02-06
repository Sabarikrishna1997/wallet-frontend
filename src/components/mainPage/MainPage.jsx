import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useLayoutEffect, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WalletIcon from "@mui/icons-material/Wallet";
import SendIcon from "@mui/icons-material/Send";
import cardImage from "../../asset/Untitled.png";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../config/config";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast, ToastContainer } from "react-toastify";
import { SnackbarProvider, useSnackbar } from "notistack";




function MainPage() {
  const local = JSON.parse(localStorage.getItem("walletData")); 
  let user=local?.user
  const [data, setData] = useState({});
  const [balance, setBalance] = useState(true);
  const [amount, setAmount] = useState(0);
  const [paymentData, setPaymentData] = useState({})
  const [history, setHistory] = useState([])
  const [error,setError]=useState(false)

  const navigate = useNavigate();
const  enqueueSnackbar  = useSnackbar();
    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar("This is a success message!", { variant });
    };
  const notifySuccess = () => {
   toast.success("🦄 Wow so easy!", {
     position: "bottom-left",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "dark",
   });
  };
  const getData = async () => {
    await baseURL(`/user/${user._id}`).then((response) => {
      setData(response.data[0]);
    });
  };
  const getHistory = async () => {
    await baseURL(`/user/history/${user._id}`).then((response) => {
       console.log(response.data)
       setHistory(response.data);
     });
  }
  useEffect(() => {
    
     if (!local) {
       navigate("/login");
       return;
     }

    getData();
  }, []);

  const addBalHandler = async () => {
    baseURL
      .post(`/user/add-bal/${user._id}`, { amount: amount })
      .then((response) => {
    
        getData();
        setBalance(true);
        handleClickVariant("success");
      });
  };
  const paymentHandler = () => {

    if (data.balance >= paymentData.amount ) {
      baseURL
        .post("/user/payment", {
          ...paymentData,
          userId: user._id,
        })
        .then((response) => {
          setPaymentData({ payTo: "", amount: "", reason: "" });
          setError(false)
          getData()
        });
    } else {
      setError(true);
    }
    
    
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnGap={5}
        rowGap={4}
      >
        <Grid container spacing={4} direction="column" sm={12} md={6}>
          {/* BALANCE */}
          <Grid item sm={12} md={4}>
            <WidgetWrapper
              height={"250px"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography color="primary">Balance</Typography>

                <Divider />
              </Box>
              <Box sx={{ display: "flex" }}>
                {balance ? (
                  <>
                    <CurrencyRupeeIcon fontSize="large" color="primary" />
                    <Typography
                      color="primary"
                      variant="h2"
                      sx={{ fontWeight: "700" }}
                    >
                      :{data?.balance}
                    </Typography>
                    <IconButton
                      color="success"
                      onClick={() => {
                        setBalance(false);
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </>
                ) : (
                  <Box>
                    <Typography color="primary">Add Balance</Typography>
                    <TextField
                      id="standard-helperText"
                      // fullWidth
                      // helperText="Please enter Wallet id or Destination Email"
                      variant="standard"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <IconButton
                      color="success"
                      onClick={() => {
                        addBalHandler();
                      }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setBalance(true);
                      }}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex" }}>
                  <IconButton color="success">
                    <NorthEastIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    color="primary"
                    sx={{ fontWeight: "700" }}
                    paddingTop={"5px"}
                  >
                    +{data?.lastCredited}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", paddingLeft: "20px" }}>
                  <IconButton color="error">
                    <SouthEastIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    color="primary"
                    sx={{ fontWeight: "700" }}
                    paddingTop={"5px"}
                  >
                    -{data?.LastDebited}
                  </Typography>
                </Box>
              </Box>
            </WidgetWrapper>
          </Grid>
          {/* INFORMATION */}
          <Grid item sm={12} md={4}>
            <WidgetWrapper
              height={"250px"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Box>
                <Box
                  style={{
                    display: "flex",

                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="primary">Information</Typography>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    paddingTop: "15px",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography color="primary" paddingRight={"10px"}>
                    <LocationOnIcon
                      fontSize="10px"
                      sx={{ marginRight: "10px" }}
                    />
                    Location:
                  </Typography>
                  <Typography variant="h6" paddingTop={"2px"}>
                    {data?.location}
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    paddingTop: "15px",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography color="primary" paddingRight={"10px"}>
                    <BusinessIcon
                      fontSize="10px"
                      sx={{ marginRight: "10px" }}
                    />
                    Address:
                  </Typography>
                  <Typography variant="h6" paddingTop={"2px"}>
                    {data?.email}
                  </Typography>
                </Box>
                <Box
                  style={{
                    paddingTop: "15px",
                    display: "flex",

                    justifyContent: "flex-start",
                  }}
                >
                  <Typography paddingRight={"7px"} color="primary">
                    <WalletIcon fontSize="10px" sx={{ marginRight: "10px" }} />
                    Wallet Id:
                  </Typography>
                  <Typography variant="h6" paddingTop={"2px"}>
                    {data.walletId}
                  </Typography>
                </Box>
              </Box>
            </WidgetWrapper>
          </Grid>
        </Grid>
        <Grid container spacing={4} direction="column" sm={12} md={6}>
          <Grid item sm={12} md={4}>
            <WidgetWrapper
              height={"530px"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={cardImage} width="190px" />
                </Box>
              </Box>
              <Box>
                {error && (
                  <Typography color="error">insufficient balance</Typography>
                )}
                <Typography color="primary">Pay To</Typography>
                <TextField
                  id="standard-helperText"
                  fullWidth
                  helperText="Please enter Wallet id or Destination Email"
                  variant="standard"
                  value={paymentData?.payTo}
                  onChange={(e) => {
                    setPaymentData({ ...paymentData, payTo: e.target.value });
                  }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  //   flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography color="primary">Amount</Typography>
                  <TextField
                    id="standard-helperText"
                    // fullWidth
                    // helperText="Please enter Wallet id or Destination Email"
                    variant="standard"
                    type="number"
                    value={paymentData?.amount}
                    onChange={(e) => {
                      setPaymentData({
                        ...paymentData,
                        amount: e.target.value,
                      });
                    }}
                  />
                </Box>
                <Box>
                  <Typography color="primary">Reason</Typography>
                  <TextField
                    id="standard-helperText"
                    // fullWidth
                    // helperText="Please enter Wallet id or Destination Email"
                    variant="standard"
                    value={paymentData?.reason}
                    onChange={(e) => {
                      setPaymentData({
                        ...paymentData,
                        reason: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<SendIcon />}
                  onClick={() => paymentHandler()}
                >
                  SEND
                </Button>
              </Box>
            </WidgetWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnGap={5}
        rowGap={4}
      >
        <WidgetWrapper width={"97%"} marginTop="10px">
          <Box>
            <Box>
              <Typography>History</Typography>
              <Divider />
            </Box>
            <Box
            // style={{
            //   display: "flex",
            //   //   flexDirection: "column",
            //   justifyContent: "space-between",
            //   marginBottom: "10px",
            //   marginTop: "10px",
            // }}
            >
              <table>
                <tr>
                  <th>index</th>
                  <th
                    style={{
                      width: "50%",
                    }}
                  >
                    Pay To
                  </th>
                  <th
                    style={{
                      width: "20%",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      width: "30%",
                    }}
                  >
                    Reason
                  </th>
                </tr>
                {data?.history?.map((i, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{i.payTo}</td>
                      <td>{i.amount}</td>
                      <td>{i.reason}</td>
                    </tr>
                  );
                })}
              </table>
            </Box>
          </Box>
        </WidgetWrapper>
      </Grid>
    </Box>
  );
}

export default MainPage;
