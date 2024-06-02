import 'dotenv/config';
import 'hardhat-deploy';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import { HardhatUserConfig } from 'hardhat/config';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  'https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY';
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  '0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
          viaIR: true,
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './src/services/blockchain/contracts',
    deploy: './src/services/blockchain/deploy',
    tests: './src/services/blockchain/test',
    cache: './src/services/blockchain/cache',
    artifacts: './src/services/blockchain/artifacts',
  },
  // typechain: {
  //   outDir: './src/services/blockchain/typechain',
  //   target: 'ethers-v5',
  // },
};

export default config;
