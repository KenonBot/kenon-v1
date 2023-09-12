require("dotenv").config();
const { WebhookClient, EmbedBuilder } = require("discord.js");

module.exports = async (client, guild) => {
  if (!guild?.name) return;

  const webhookPrivate = new WebhookClient({ url: process.env.WEBHOOKPRIVATE });

  await webhookPrivate.send({
    avatarURL: "https://cdn.discordapp.com/avatars/1103729008077721600/51550612d5c40e6cfa22d3f332f902ba.webp?size=40",
    username: "Kenon",
    embeds: [
      new EmbedBuilder()
        .setTitle(`> Joined Server`)
        .setColor("#00FF00")
        .setThumbnail(
          guild.iconURL({
            format: "png",
            dynamic: true,
          }),
        )
        .setDescription(
          `**Name**: ${
            guild.name
          }\n**Users**: ${guild.memberCount.toLocaleString()}`,
        ),
    ],
    allowedMentions: { parse: [] },
  });
};
