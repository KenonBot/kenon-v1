const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote for the Bot and Support us!")
    .setDmPermission(false),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#35393e")
      .setTitle("<:klist:1134998610044538890> 〢 Vote Kenon")
      .setDescription(
        "> Our team works hard to provide you the best experience. We're thankful for every Supporter! Also, leave a Review if you want, we're open for suggestions ;)",
      )
      .addFields(
        {
          name: "<:klink:1134998612053602397> | Top.gg",
          value: `> [Vote](https://top.gg/bot/1103729008077721600)`,
          inline: false,
        },
        {
          name: "<:klink:1134998612053602397> | DiscordBotList",
          value: `> [Vote](https://discord.ly/kenon)`,
          inline: false,
        },
        {
          name: "<:klink:1134998612053602397> | Discords",
          value: `> [Vote](https://discords.com/bots/bot/1103729008077721600)`,
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
