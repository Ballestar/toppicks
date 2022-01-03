
const main = async() => {
    const nftContractFactory = await hre.ethers.getContractFactory('toppicks'); // compile our contract and generate necessary files we need to work with it under the artifacts directory
    const nftContract = await nftContractFactory.deploy(); // deploy contract to local ethereum network, it'll destroy the local network once the script completes
    await nftContract.deployed(); //wait until our contract is officially mined and deployed to our blockchain, hardhat immitates fake miners.
    console.log("contract deployed to:", nftContract.address);
}

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    } catch {
        console.log(error);
        process.exit(1);
    }
}

runMain();