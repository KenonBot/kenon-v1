const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends you a Help Page")
    .setDmPermission(false),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder();

    const languageMappings = {
      de_DE: "de",
      en_EN: "en",
      es_ES: "es",
      fr_FR: "fr",
    };

    const commands = await client.application.commands.fetch();

    const type =
      languageMappings[guildDb?.language] ||
      "en"

        .setColor("#35393e")
        .setTitle("<:kquestion:1134998601639149608> 〢 Help")
        .setDescription(
          `\n${commands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
              (n) =>
                `</${n.name}:${n.id}> - ${
                  type === "de"
                    ? n.descriptionLocalizations.de
                    : type === "es"
                    ? n.descriptionLocalizations["es-ES"]
                    : n.description
                }`,
            )
            .join("\n")}`,
        );

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Docs")
        .setStyle(5)
        .setEmoji("<:kquestion:1134998601639149608>")
        .setURL("https://kenonbot.com/docs.html"),
    );

    await interaction.reply({
      embeds: [pingembed],
      components: [button],
    });
  },
};
