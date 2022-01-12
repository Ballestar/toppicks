import metamasklogo from '../images/metamask-logo.png';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

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
                type="submit"
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