require('dotenv').config();
const { Web3 } = require('web3');
const abis = require('./abis/abis.js');

const web3 = new Web3("https://api.avax.network/ext/bc/C/rpc")

const wallet = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)[0]

const getWalletAddress = () => wallet.address;

const initContracts = () => {
    const contracts = [];
    Object.entries(abis).forEach(([name, abi]) => {
        const contract = new web3.eth.Contract(abi.ABI, abi.ADDRESS);
        if (contract != null) {
            contracts.push({ name: name, address: abi.ADDRESS, balanceMethod: abi.BALANCE_METHOD, contract: contract });
            console.log(`${name} @${abi.ADDRESS} - initialised`);
        }
    });
    return contracts
}


const compountAll = async (contracts) => {
    let compoundInfo = []
    for await (const c of contracts) {
        const beforeCompound = await getBalance(c.contract, c.balanceMethod);
        await compound(c.contract);
        const afterCompound = await getBalance(c.contract, c.balanceMethod);
        compoundInfo.push({ name: c.name, before: beforeCompound, after: afterCompound });
    }
    return compoundInfo;
}

const compound = async (contract) => {
    return new Promise((resolve, reject) => {
        contract.methods.compound(wallet.address).send({ from: wallet.address, gas: 1000000 })
            .then(() => resolve(true))
    });
}

const getBalances = async (contracts) => {
    for await (const c of contracts) {
        console.log(`Getting balance for ${c.name}`)
        const balance = await getBalance(c.contract, c.balanceMethod);
        console.log(`\tbalance: ${balance}`);
    }
}

const getBalance = async (contract, methodName) => {
    return await contract.methods[methodName](wallet.address).call();
}


module.exports = {
    getWalletAddress,
    initContracts,
    compountAll,
    compound,
    getBalances,
    getBalance
}