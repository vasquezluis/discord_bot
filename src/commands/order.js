import { SlashCommandBuilder } from "@discordjs/builders";

// slash command (Slash Command Builder)
const orderCommand = new SlashCommandBuilder()
  .setName("order")
  .setDescription("Order your favorite meals...")
  .addStringOption((option) =>
    option
      .setName("food")
      .setDescription("Select food")
      .setRequired(true)
      .setChoices(
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
        }
      )
  )
  .addStringOption((option) =>
    option
      .setName("drink")
      .setDescription("Select your favorite ")
      .setRequired(true)
      .setChoices(
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
        }
      )
  );

export { orderCommand };
