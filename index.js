const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!ban')) {
        const args = message.content.split(' ');
        const playerName = args[1];

        if (!playerName) {
            return message.reply('Please specify a player to ban.');
        }

        try {
            const response = await axios.post('http://localhost:3000/ban', { playerName });
            if (response.data.success) {
                message.reply(`Player ${playerName} has been banned successfully.`);
            } else {
                message.reply('Failed to ban the player.');
            }
        } catch (error) {
            message.reply('An error occurred while trying to ban the player.');
            console.error(error);
        }
    }
});

// Log in to Discord with your app's token
client.login(DISCORD_TOKEN);
