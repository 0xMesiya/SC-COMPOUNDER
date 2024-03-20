# ShitCoin-Compounder

## Description

used to auto compound all of the shitcoin miners.

Currently only supports KONGMINER & COQMINER. Can be easily extended by adding to /abis/. Any `.json` files found in that directly will try to load as an ABI.

Any abi's being added must follow the following format.

{
    "ADDRESS": "miner address",
    "BALANCE_METHOD": "the name of the method to get miners",
    "ABI": "ABI - usually only needs the compound method and the getMiners method (this is usually different per contract)"
}

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository.
2. Install the dependencies using `npm install` or `yarn install`.
3. Create a `.env` file in the root directory of the project.

## Configuration

The following environment variables need to be set in the `.env` file:

- `PRIVATE_KEY`: Private key
- `DISCORD_WH_URL`: Discord webhook URL
- `FREQUENCY_HOURS`: How often to compound (must be in full hours)
- ...

## Usage

`npm start`