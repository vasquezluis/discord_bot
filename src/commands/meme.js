import { SlashCommandBuilder } from "@discordjs/builders";

const memeCommand = new SlashCommandBuilder()
  .setName("meme")
  .setDescription("Shows a meme")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("The type of the meme...")
      .setRequired(true)
      .setChoices(
        {
          name: "Random",
          value: "random",
        },
        {
          name: "Images",
          value: "images",
        },
        {
          name: "Text",
          value: "text",
        },
        {
          name: "Funny",
          value: "funny",
        }
      )
  );

export { memeCommand };
