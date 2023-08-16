const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows you interesting Stuff about the Bot.")
    .setDMPermission(true),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#2f3136")
      .setTitle("<:kdocument:1134998599462297601> 〢 About Kenon")
      .setDescription(
        "Kenon is a dynamic Discord bot designed to enhance your server's image-related interactions. With this versatile bot, you can engage your community in various image-based activities and challenges. One of Kenon's prominent features is the \"Guess-A-Picture\" game. It offers an exciting and interactive experience where participants can test their visual recognition skills. The bot presents an image and players can submit their guesses using commands or reactions. Kenon provides immediate feedback, letting players know if their guess was correct or not. With Kenon, you can foster creativity, interactivity, and fun within your server's image-focused activities. Whether you're hosting image-based competitions, sharing visual content, or simply engaging in casual image conversations, Kenon is the ideal companion to enhance your server's image-related experiences.",
      );

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Support Server")
        .setStyle(5)
        .setEmoji("<:kquestion:1134998601639149608>")
        .setURL("https://discord.gg/qyAmUsYU35"),
    );

    await interaction.reply({
      embeds: [pingembed],
      components: [button],
    });
  },
};
