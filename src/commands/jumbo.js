const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jumbo")
    .setDescription("Sends a provided emoji as an image or gif!")
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("The emoji to send as an image or gif")
        .setRequired(true),
    )
    .setDmPermission(false),

  async execute(interaction) {
    const { options } = interaction;
    const emoji = options.getString("emoji");

    // Check if no emoji is given
    if (!emoji) {
      return interaction.reply(
        "No emoji provided. Please provide a valid Discord emoji.",
      );
    }

    const match = emoji.match(/^<a?:\w+:(\d+)>$/);
    if (!match) {
      return interaction.reply(
        "Invalid emoji provided. Please provide a valid Discord emoji.",
      );
    }

    const emojiID = match[1];
    const isAnimated = emoji.startsWith("<a:");

    let imageURL;
    let extension;
    if (isAnimated) {
      imageURL = `https://cdn.discordapp.com/emojis/${emojiID}.gif`;
      extension = ".gif";
    } else {
      imageURL = `https://cdn.discordapp.com/emojis/${emojiID}.png`;
      extension = ".png";
    }

    const supportedExtensions = [".png", ".gif", ".jpg", ".jpeg"];

    if (!supportedExtensions.includes(extension)) {
      return interaction.reply(
        "Invalid emoji format. Supported formats are PNG, GIF, JPG, and JPEG.",
      );
    }

    const embed = new EmbedBuilder()
      .setColor("#35393e")
      .setTitle("<:klist:1134998610044538890>  〢 Emoji to File")
      .setDescription(`> Type: **${isAnimated ? "Animated" : "Static"}**`)
      .setImage(imageURL);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
