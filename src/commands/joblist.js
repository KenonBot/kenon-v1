const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joblist")
    .setDescription("Lists current Jobs"),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

      .setColor("#35393e")
      .setTitle("<:kpc:1134998607909621860> 〢 Jobs")
      .setDescription('> See a list of Jobs here. Apply by using `/job apply`.')
      .addFields(
        {
          name: "Warehouse Clerk",
          value: `> Salary: **30 per Workshift**\n> Required workshifts: **0**`,
          inline: false,
        },
        {
            name: "Waiter",
            value: `> Salary: **45 per Workshift**\n> Required workshifts: **10**`,
            inline: false,
          },
          {
            name: "Full Stack Developer",
            value: `> Salary: **70 per Workshift**\n> Required workshifts: **25**`,
            inline: false,
          },
      )
      

    await interaction.reply({
      embeds: [pingembed]
    });
  },
};
