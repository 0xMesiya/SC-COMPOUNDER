require('dotenv').config();
const { EmbedBuilder, WebhookClient } = require('discord.js')


const DISCORD_WH_URL = process.env.DISCORD_WH_URL;

const createWebhookClient = () => {
    return new WebhookClient({
        url: DISCORD_WH_URL
    })
}

const buildEmbed = () => {
    return new EmbedBuilder()
        .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
        .setAuthor({ name: "SC-COMPOUNDER" })
        .setTimestamp()
}

const sendWebhook = async (title, data, walletAddress) => {
    const wh = createWebhookClient();

    var embed = buildEmbed();
    Object.entries(buildData(data, walletAddress)).forEach((value) => {
        embed.addFields({ name: value[0], value: value[1].data, inline: value[1].inline || false })
    });

    await wh.send({ embeds: [embed] })
}

const buildData = (compoundInfo, walletAddress) => {
    let embedData = {
        "Wallet": { data: walletAddress, inline: true }
    };

    compoundInfo.forEach(info => {
        embedData[info.name] = { data: `${info.before} >> ${info.after}\t+${info.after - info.before}` };
    });
    return embedData;
}

module.exports = {
    sendWebhook
}