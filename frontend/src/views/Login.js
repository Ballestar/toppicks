import metamasklogo from '../images/metamask-logo.png';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Router, useNavigate } from 'react-router-dom';

const Login = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
      checkIfWalletIsConnected();
    })

    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
					setCurrentAccount(account)
          
          // Setup listener! This is for the case where a user comes to our site
          // and ALREADY had their wallet connected + authorized.
          // setupEventListener()
      } else {
          console.log("No authorized account found")
      }
  }

  const connectWallet = async (event) => {
    event.preventDefault();
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      navigate('/');
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener() 
    } catch (error) {
      console.log("error", error)
    }
  }

  
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={metamasklogo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">connect your metamask wallet</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                download the metamask extension from the google chrome store
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              
            </div>

            <div className="flex items-center text-center justify-between">
              <div className="text-md">
                nba toppicks uses the ethereum rinkeby testnet {' '}
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                do not connect to ethereum mainnet!
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={connectWallet}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                connect wallet
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;