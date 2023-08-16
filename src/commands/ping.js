const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the clients ping")
    .setDMPermission(false),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#35393e")
      .setTitle("<:kdot:1134998624238059540> 〢 Pong!")

      .addFields({
        name: "**Api** latency",
        value: `> **${Math.round(client.ws.ping)}**ms`,
        inline: false,
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Discord Status")
        .setStyle(5)
        .setEmoji("<:kpc:1134998607909621860>")
        .setURL("https://discordstatus.com/"),
    );

    await interaction.reply({
      embeds: [pingembed],
      components: [button],
    });
  },
};
