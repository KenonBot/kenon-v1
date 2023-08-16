const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about an user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get information about"),
    )
    .setDMPermission(false),

  async execute(interaction) {
    const userOption =
      interaction.options.getUser("user") || interaction.member.user;

    const user = userOption;
    const userName = `${user.username}#${user.discriminator}`;
    const userId = user.id;
    const accountAge = Math.floor(
      (Date.now() - user.createdTimestamp) / (1000 * 60 * 60 * 24),
    ); // Account age in days

    const bannerUrl = user.bannerURL();
    const avatarUrl = user.displayAvatarURL({ dynamic: true });

    const hasNitro = userOption.premiumSince !== null;

    const embed = new EmbedBuilder()
      .setColor("#2f3136")
      .setTitle("<:khuman:1135001368185286726> 〢 User Information")
      .setThumbnail(avatarUrl)
      .addFields(
        {
          name: "<:klist:1134998610044538890> | Username",
          value: `> ${userName}`,
          inline: true,
        },
        {
          name: "<:kcalender:1134998615870419034> | Account Age",
          value: `> ${accountAge} days`,
          inline: true,
        },
        {
          name: "<:k_id:1135001118582243458> | User ID",
          value: `> ${userId}`,
          inline: false,
        },
        {
          name: "<:klink:1134998612053602397> | Partner Status",
          value: userOption.partner
            ? "> <:kenon_check:1114287187647803402> Partnered with Discord."
            : "> <:kenon_cross:1114287214868844635> Not a Discord Partner.",
          inline: true,
        },
      );

    if (bannerUrl) {
      embed.setImage(bannerUrl);
    }

    await interaction.reply({ embeds: [embed] });
  },
};
