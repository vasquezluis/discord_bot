import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

config();

// obtener el variables de entorno
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// create the cliente
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// instanciar REST
const rest = new REST({ version: "10" }).setToken(TOKEN);

// listen to an event
client.on("ready", () => console.log(`${client.user.tag} has logged in.`));

// interaction event
client.on('interactionCreate', (interaction) => {
  if(interaction.isChatInputCommand()) {
    console.log('Hello world')
    interaction.reply({ content: 'Hola papi!' })
  }
})

// // handle message event
// client.on("messageCreate", (message) => {
//   console.log(message.content);
//   console.log(message.createdAt.toDateString());
//   console.log(message.author.tag);
// });

// // handle a create channel event
// client.on("channelCreate", (channel) => {
//   console.log(channel.name);
//   console.log(channel.createdAt);
//   console.log(channel.id);
// })

async function main() {
  const commands = [
    {
      name: "order",
      description: "Order something...",
    },
  ];

  try {
    // register a slash command
    console.log("Started refreshing application (/) commands.");
    // Routes.applicationGuildCommand()

    // update commands list
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    // cliente initialization
    client.login(TOKEN);
  } catch (error) {
    console.log(error);
  }
}

main();
