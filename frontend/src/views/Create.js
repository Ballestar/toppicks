import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {useNavigate } from 'react-router-dom';
import abi from '../utils/toppicks.json';

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [jpeg, setJpeg] = useState(null);
  const [price, setPrice] = useState(0);
  const [mining, setMining] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  
  const { ethereum } = window;
  const navigate = useNavigate();

  const contractAddress ="0x81097b2Aacf41300A503C7Dbf9f2eB548979ce08"
  const contractABI = abi.abi

  useEffect(() => {
    checkIfWalletIsConnected();
  })

  const checkIfWalletIsConnected = async () => {

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
        console.log(account);
        // Setup listener! This is for the case where a user comes to our site
        // and ALREADY had their wallet connected + authorized.
        // setupEventListener()
    } else {
        console.log("No authorized account found")
    }
}

  const nameSelectedHandler = (e) => {
    setName(e.target.value);
    console.log(name);
  }

  const descriptionSelectedHandler = (e) => {
    setDescription(e.target.value);
    console.log(description);
  }
  const jpegSelectedHandler = (e) => {
    setJpeg(e.target.files[0]);
    console.log(jpeg);
  }
  const priceSelectedHandler = (e) => {
    setPrice(e.target.value);
    console.log(price);
  }

  const mintNFT = async(e) =>{
    e.preventDefault();
    setMining(true);
    try{
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const topPickContract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const createTxn = await topPickContract.create()
      console.log('Create transaction started...', createTxn.hash)
  
      await createTxn.wait();
      console.log('Created keyboard!', createTxn.hash);
      navigate('/');

    } finally{
      setMining(false);
    }

  }



  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        player name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          onChange={nameSelectedHandler}
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="who's the player"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      description
                    </label>
                    <div className="mt-1">
                      <textarea
                        onChange={descriptionSelectedHandler}
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="describe your top pick"
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        price
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          onChange={priceSelectedHandler}
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="how much eth do u want"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">jpeg</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input onChange={jpegSelectedHandler} id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick = {mintNFT}
                    // type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    mint
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create;