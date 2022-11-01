import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

// import commands
import { orderCommand } from "./commands/order.js";
import { memeCommand } from "./commands/meme.js";
import { motivationCommand } from "./commands/motivation.js";

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
client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;
    const user = interaction.user;

    if (commandName == "order") {
      console.log(
        `new order request by ${user.username}#${user.discriminator}`
      );

      // obtener el valor de las opciones
      const foodSelected = interaction.options.get("food");
      const drinkSelected = interaction.options.get("drink");
      console.log(`${foodSelected.name}: ${foodSelected.value}`);
      console.log(`${drinkSelected.name}: ${drinkSelected.value}`);

      interaction.reply({
        content: `Has ordenado ${foodSelected.value} y ${drinkSelected.value}`,
      });
    } else if (commandName == "meme") {
      console.log(`new meme request by ${user.username}#${user.discriminator}`);
      interaction.reply({ content: "Proximamente meme aqui!" });
    } else if (commandName == "motivation") {
      console.log(
        `new motivation request by ${user.username}#${user.discriminator}`
      );
      interaction.reply({ content: "Proximamente motivation aqui!" });
    }
  } else {
    return;
  }
});

async function main() {
  // slash command
  const commands = [
    orderCommand.toJSON(),
    memeCommand.toJSON(),
    motivationCommand,
  ];

  try {
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

// handle message event
/* client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(message.createdAt.toDateString());
  console.log(message.author.tag);
  message.reply({ content: "No escribas eso papi!" });
}); */

// // handle a create channel event
// client.on("channelCreate", (channel) => {
//   console.log(channel.name);
//   console.log(channel.createdAt);
//   console.log(channel.id);
// })
