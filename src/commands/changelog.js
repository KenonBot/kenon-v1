const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Displays the Latest Changelog of the Bot.")
    .setDmPermission(false),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#2f3136")
      .setTitle("<:kpc:1134998607909621860> 〢 Changelog")
      .setDescription("Version: 2.0.4")
      .addFields(
        {
          name: "New Guess the Picture Category!",
          value:
            ">>> Attention, Railway Fans!\nWe've added the Category \"Trains\". This isn't big at the moment, but we are going to add more questions soon!",
        },
        {
          name: "Introducing... Job System!",
          value:
            ">>> It's now possible to earn credits by working! Select your Job and you are able to work every 90 Minutes.",
        },
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
