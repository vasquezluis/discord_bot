require('dotenv').config();
const { token } = process.DISCORD_TOKEN;
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')

const client = Client({ intents: GatewayIntentBits.Guilds })
client.commands = new Collection();

