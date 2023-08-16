const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team")
    .setDescription("Shows you the Team of Kenon.")
    .setDMPermission(false),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#35393e")
      .setTitle("<:khuman:1135001368185286726> 〢 Team")
      .setDescription(
        "> Our team works hard to provide you the best experience. Here you can see a list of our current Team Members.",
      )
      .addFields(
        {
          name: "<:kcrown:1135001140648493148> | Developers (1)",
          value: `> cgxdev`,
          inline: false,
        },
        {
          name: "<:kshield:1134998614075244656> | Staff (3)",
          value: `> doom4846, watersaltice, pxule`,
          inline: false,
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
