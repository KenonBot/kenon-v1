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
    .setDMPermission(false),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#2f3136")
      .setTitle("<:kpc:1134998607909621860> 〢 Changelog")
      .setDescription("Version: 2.0.5")
      .addFields({
        name: "New Commands!",
        value:
          ">>> Do you want a new Profile Picture related to Anime? Try `/animeavatar`! OR `/randomwebsite` if you are really bored...",
      });

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
