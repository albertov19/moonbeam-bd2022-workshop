require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
const { privateKey, moonscanApiKey } = require('./secrets.json');

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: '0.8.4',
    networks: {
        moonbase: {
            url: 'https://rpc.api.moonbase.moonbeam.network',
            chainId: 1287, // 0x507 in hex,
            accounts: [privateKey],
        },
        moonbeamDev: {
            url: 'http://localhost:9933',
            chainId: 1281,
            accounts: ['0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342'],
        },
    },

    etherscan: {
        apiKey: moonscanApiKey,
    },
};
