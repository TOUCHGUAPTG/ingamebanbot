const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

const ROBLOX_COOKIE = process.env.ROBLOX_COOKIE; // Use environment variable for Roblox cookie

// Function to ban a player using Roblox API
const banPlayerFromRoblox = async (playerName) => {
    try {
        // Replace with your actual Roblox API endpoint and payload
        const response = await axios.post('https://api.roblox.com/v1/ban', {
            username: playerName,
            reason: 'Violation of game rules', // Specify a reason for the ban
        }, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${ROBLOX_COOKIE}`, // Use the Roblox cookie for authentication
                'Content-Type': 'application/json',
            }
        });

        return response.data; // return the response from Roblox API
    } catch (error) {
        console.error('Error banning player:', error);
        return { success: false };
    }
};

app.post('/ban', async (req, res) => {
    const { playerName } = req.body;

    if (!playerName || playerName.length < 3) {
        return res.status(400).json({ success: false, message: 'Invalid player name.' });
    }

    const result = await banPlayerFromRoblox(playerName);
    
    if (result.success) {
        res.json({ success: true, message: `Player ${playerName} has been banned successfully.` });
    } else {
        res.json({ success: false, message: 'Failed to ban the player.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Ban API listening on port ${PORT}`);
});
