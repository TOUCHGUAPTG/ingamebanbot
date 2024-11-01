const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); // For making HTTP requests
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Replace with your Roblox ban API endpoint
const robloxBanAPI = 'https://your-roblox-api-endpoint.com/ban';

client.on('ready', () => {
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
            const response = await axios.post(robloxBanAPI, { playerName });
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

// Make sure to set your bot token in your environment variables
client.login(process.env.DISCORD_TOKEN);
