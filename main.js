const schedule = require('node-schedule');
const contractHelper = require('./contractHelper.js');
const { sendWebhook } = require('./abis/discord.js');
require('dotenv').config();

const FREQUENCY_HOURS = process.env.FREQUENCY_HOURS;
const rule = new schedule.RecurrenceRule();
rule.hour = FREQUENCY_HOURS;
rule.tz = 'Etc/UTC';

const contracts = contractHelper.initContracts();

const main = async () => {
    let compoundInfo = await contractHelper.compountAll(contracts);
    await sendWebhook("Compound Info", compoundInfo, contractHelper.getWalletAddress());
}

main()

schedule.scheduleJob(rule, async () => {
    await main();
})