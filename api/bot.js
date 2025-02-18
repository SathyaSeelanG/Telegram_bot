const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();
// Load dataset
const dataset = JSON.parse(fs.readFileSync('dataset.json'));
// console.log('Dataset path:', dataset);

// Function to handle /start command
const start = (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! I'm your friendly chatbot. How can I assist you today?");
};

// Function to handle incoming messages
const aiAssistant = (msg) => {
    const userMessage = msg.text;
    const response = getResponse(userMessage);
    console.log(`User Message: ${userMessage}`);
    console.log(`AI Response: ${response}`);
    bot.sendMessage(msg.chat.id, response);
};

// Function to get response based on user input
const getResponse = (userInput) => {
    for (let pair of dataset) {
        if (userInput.toLowerCase().includes(pair.input.toLowerCase())) {
            return pair.response;
        }
    }
    return "I'm sorry, I don't understand that.";
};


const token = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Listeners for commands and messages
bot.onText(/\/start/, start);
bot.on('message', aiAssistant);

console.log("Bot is running...");
