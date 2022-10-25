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
client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName == "order") {
      console.log("Alguien escribio /order");
      // obtener el valor de las opciones
      const foodSelected = interaction.options.get("food");
      const drinkSelected = interaction.options.get("drink");
      console.log(`${foodSelected.name}: ${foodSelected.value}`);
      console.log(`${drinkSelected.name}: ${drinkSelected.value}`);
      interaction.reply({
        content: `Has ordenado ${foodSelected.value} y ${drinkSelected.value}`,
      });
    } else if (commandName == "meme") {
      console.log("Alguien escribio /meme");
      interaction.reply({ content: "Proximamente meme aqui!" });
    } else if (commandName == "motivation") {
      console.log("Alguien escribio /motivation");
      interaction.reply({ content: "Proximamente motivation aqui!" });
    }
  } else {
    return;
  }
});

async function main() {
  // register a slash command
  const commands = [
    {
      name: "order",
      description: "Order something...",
      options: [
        {
          name: "food",
          description: "the type of food",
          type: 3,
          required: true,
          choices: [
            {
              name: "Cake",
              value: "cake",
            },
            {
              name: "Hamburger",
              value: "hamburger",
            },
            {
              name: "Pizza",
              value: "pizza",
            },
          ],
        },
        {
          name: "drink",
          description: "the type of drink",
          type: 3,
          required: true,
          choices: [
            {
              name: "Coca-cola",
              value: "coca-cola",
            },
            {
              name: "Pepsi",
              value: "pepsi",
            },
            {
              name: "Tea",
              value: "tea",
            },
          ],
        },
      ],
    },
    {
      name: "meme",
      description: "Shows a random meme...",
    },
    {
      name: "motivation",
      description: "Shows a motivation phrase...",
    },
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
