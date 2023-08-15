const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const User = require('../models/User');

// Map to store the cooldowns of each user
const cooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('Beg for some credits!'),

  async execute(interaction) {
    const userId = interaction.user.id;

    // Check if the user is on cooldown
    if (cooldowns.has(userId)) {
      const remainingCooldown = getRemainingCooldown(userId);

      const cooldownEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setTitle('<:ktime:1135000938021658826> 〢 Cooldown')
        .setDescription(`> You are on cooldown! Please wait **${remainingCooldown}** before begging again.`);

      await interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
      return;
    }

    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({
        userId,
        credits: 0, // Set initial credits to 0 for new users
      });
    }

    const creditsEarned = Math.floor(Math.random() * 20) + 1; // Randomly generate credits between 1 and 20

    user.credits += creditsEarned;
    await user.save();

    const earningsEmbed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle('<:klift:1135001245086658580> 〢 Beg')
      .setDescription(`> You begged and received <:kenon_coin:1117946111034937424>\`${creditsEarned}\` credit(s)!`);

    await interaction.reply({ embeds: [earningsEmbed] });

    // Apply cooldown to the user
    setCooldown(userId);

    setTimeout(() => {
      removeCooldown(userId);
    }, 3600000); // 60 minutes cooldown
  },
};

function getRemainingCooldown(userId) {
  const cooldownEnd = cooldowns.get(userId);
  const remainingTime = cooldownEnd - Date.now();
  const minutes = Math.ceil(remainingTime / 60000);
  return `${minutes} minute(s)`;
}

function setCooldown(userId) {
  const cooldownEnd = Date.now() + 3600000; // 60 minutes cooldown
  cooldowns.set(userId, cooldownEnd);
}

function removeCooldown(userId) {
  cooldowns.delete(userId);
}
