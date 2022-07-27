import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/config';
// import tasks!!!!
import './tasks/block-number';

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';
/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    // outputFile: 'gas-report.txt',
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: 'MATIC',
  },
};
export default config;
