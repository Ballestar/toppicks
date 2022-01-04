import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import metamasklogo from '../images/metamask-logo.png';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";


const theme = createTheme();

const Login = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        checkIfWalletIsConnected();
    })

    const checkIfWalletIsConnected = async () => {
        const {ethereum} = window;

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if(accounts.length !== 0){
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account)
        } else{
            console.log("No authorized account found");
        }
    }

    const connectWallet = async() => {
        try {
            const {ethereum} = window;

            if(!ethereum){
                alert("get the metamask chrome extension!")
                return;
            }

            let chainId = await ethereum.request({method: 'eth_chainId'});
            console.log("connected to chain" + chainId);

            const rinkebyChainId = "0x4";

            if(chainId !== rinkebyChainId){
                alert("you are not connected to the rinkeby testnet!")
            }
            
            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error)
        }
    }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            NBA Top Picks
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h4" align="center" gutterBottom>
          connect metamask wallet
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          NBA Top Picks is built on top of the rinkeby testnet.
          do not connect mainnet wallet.
        </Typography>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image= {metamasklogo}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                rinkeby test network
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick = {connectWallet} size="large" variant="contained">Connect Wallet</Button>
            </CardActions>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                or download chrome extension
                </Typography>
            </CardContent>
        </Card>
      </Box>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          built by @0xburgerboy
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Login;