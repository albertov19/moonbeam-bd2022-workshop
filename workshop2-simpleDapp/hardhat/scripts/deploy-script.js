const hre = require('hardhat');

async function main() {
    console.log('Deploying contract...');
    const ContractInstance = await hre.ethers.getContractFactory('MoonbaseBlockdown22');
    const contract = await ContractInstance.deploy();

    await contract.deployed();

    console.log('Contract deployed to:', contract.address);
    console.log(`Tx Hash: ${contract.deployTransaction.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
