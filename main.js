const schedule = require('node-schedule');
const contractHelper = require('./contractHelper.js');
const { sendWebhook } = require('./discord.js');
require('dotenv').config();

const FREQUENCY_HOURS = process.env.FREQUENCY_HOURS;
const rule = new schedule.RecurrenceRule();
rule.hour = new schedule.Range(0, 23, +FREQUENCY_HOURS);
rule.minute = 0;
rule.tz = 'Etc/UTC';

const startInfo = () => {
    console.log(`Starting Compound Bot\n\tPRIV_KEY: ${process.env.PRIVATE_KEY}\n\tWH_URL: ${process.env.DISCORD_WH_URL}\n\tFREQUENCY: ${process.env.FREQUENCY_HOURS}\n`);
}

startInfo();

const contracts = contractHelper.initContracts();

const main = async () => {
    let compoundInfo = await contractHelper.compountAll(contracts);
    await sendWebhook("Compound Info", compoundInfo, contractHelper.getWalletAddress());
}

main()

schedule.scheduleJob(rule, async () => {
    await main();
})