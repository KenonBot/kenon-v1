const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const User = require('../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Display the top 10 users based on credits'),

  async execute(interaction) {
    const leaderboardEmbed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle('<:klist:1134998610044538890> 〢 Leaderboard - Top 10 Users');

    // Fetch the top 10 users based on credits in descending order
    const users = await User.find().sort({ credits: -1 }).limit(10);

    if (users.length === 0) {
      leaderboardEmbed.setDescription('> No users found.');
    } else {
      let leaderboardText = '';
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let username;
        try {
          const fetchedUser = await interaction.client.users.fetch(user.userId);
          username = fetchedUser.username;
        } catch (error) {
          console.error(`Error fetching user: ${user.userId}`, error);
          username = 'Unknown User';
        }
        leaderboardText += `> ${i + 1}. ${username} - <:kcoin:1135002536777093170> \`${user.credits}\` credits\n`;
      }
      leaderboardEmbed.setDescription(leaderboardText);
    }

    await interaction.reply({ embeds: [leaderboardEmbed] });
  },
};
