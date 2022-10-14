import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

config();

// create the cliente
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;

// cliente initialization
client.login(TOKEN);

// listen to an event
client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

// handle message event
client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(message.createdAt.toDateString());
  console.log(message.author.tag);
});

// handle a create channel event
client.on("channelCreate", (channel) => {
  console.log(channel.name);
  console.log(channel.createdAt);
  console.log(channel.id);
})


