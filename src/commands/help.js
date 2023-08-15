const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends you a Help Page"),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#35393e")
      .setTitle("<:kquestion:1134998601639149608> 〢 Help")
      .setDescription('> Click the Button below to go see Kenon\'s Documentation.')
      

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Docs')
          .setStyle(5)
          .setEmoji('<:kquestion:1134998601639149608>')
          .setURL('https://kenonbot.com/docs.html'),
      );

    await interaction.reply({
      embeds: [pingembed],
      components: [button],
    });
  },
};