const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Get information about the server")
    .setDMPermission(false),

  async execute(interaction) {
    const guildIdParam = interaction.options.getString("server");
    const guild = guildIdParam
      ? interaction.client.guilds.cache.get(guildIdParam)
      : interaction.guild;

    if (!guild) {
      await interaction.reply("Invalid server ID provided.");
      return;
    }

    await interaction.guild.members.fetch(); // Fetch members specifically for the current guild

    const guildName = guild.name;
    const guildIdValue = guild.id;
    const owner = await guild.fetchOwner(); // Fetch the owner information
    const ownerName = owner
      ? `${owner.user.username}#${owner.user.discriminator}`
      : "Unknown Owner";
    const ownerId = owner ? owner.id : "Unknown Owner ID";
    const serverIconUrl =
      guild.iconURL({ dynamic: true }) || "No server icon available";
    const serverBoostLevel = guild.premiumTier;
    const serverBoostCount = guild.premiumSubscriptionCount;
    const serverBannerUrl = guild.bannerURL() || "No server banner available";

    const embed = new EmbedBuilder()
      .setColor("#2f3136")
      .setTitle("<:khuman:1135001368185286726> 〢 Server Information")
      .setThumbnail(serverIconUrl)
      .addFields(
        {
          name: "<:klist:1134998610044538890> | Server Name",
          value: `> ${guildName}`,
          inline: true,
        },
        {
          name: "<:k_id:1135001118582243458> | Server ID",
          value: `> ${guildIdValue}`,
          inline: true,
        },
        {
          name: "<:khuman:1135001368185286726> | Owner Name",
          value: `> ${ownerName}`,
          inline: true,
        },
        {
          name: "<:k_id:1135001118582243458> | Owner ID",
          value: `> ${ownerId}`,
          inline: true,
        },
        {
          name: "<:kgift:1134998617996935198> | Server Boost Level",
          value: `> Level ${serverBoostLevel}`,
          inline: true,
        },
        {
          name: "<:kgift:1134998617996935198> | Server Boost Count",
          value: `> ${serverBoostCount}`,
          inline: true,
        },
      );

    if (serverBannerUrl !== "No server banner available") {
      embed.setImage(serverBannerUrl);
    }

    await interaction.reply({ embeds: [embed] });
  },
};
