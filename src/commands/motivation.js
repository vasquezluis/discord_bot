import { SlashCommandBuilder } from "@discordjs/builders";

const motivationCommand = new SlashCommandBuilder()
  .setName("motivation")
  .setDescription("Shows a rantom motivation quotes...");

export { motivationCommand };
