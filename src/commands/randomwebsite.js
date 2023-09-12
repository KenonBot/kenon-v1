const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomwebsite")
    .setDescription("Displays a random website. Why not?")
    .setDMPermission(false),

  async execute(interaction, client) {
    // Generate a random website URL (you can add more URLs to choose from)
    const websites = [
      "https://example.com",
      "https://oooooooooooooo.ooo",
      "https://cgxdev.eu",
      "https://kenonbot.com",
      "https://wouldyoubot.gg",
      "https://idk.lol",
      "https://wtf.com",
      "https://hacked.com",
      "https://kaufland.de",
      "https://matrix.com",
      "https://nohello.net",
      "https://kenon.com",
      "https://hello.net",
      "https://themeparkcrazy.com",
      "https://lol.com",
      "https://geoguessr.com",
      "https://flightradar24.com",
      "https://hackertyper.com",
      "https://paint.toys",
      "https://puginarug.com",
      "https://sliding.toys",
      "https://longdogechallenge.com",
	  "https://alwaysjudgeabookbyitscover.com",
      "https://optical.toys",
      "https://mackprodukt.de",
      "https://cursoreffects.com",
      "https://mondrianandme.com",
      "https://heeeeeeeey.com",
      "https://hooooooooo.com",
      "https://onesquareminesweeper.com",
      "https://smashthewalls.com",
      "https://thatsthefinger.com",
      "https://corndog.io",
      "https://sliding.toys",
      "https://clicking.toys",
      "https://weirdorconfusing.com",
      "https://checkbox.toys/",
        "https://floatingqrcode.com/",
        "https://optical.toys/",
        "http://eelslap.com/",
        "https://binarypiano.com/",
        "https://jacksonpollock.org/",
        "http://burymewithmymoney.com/",
        "http://endless.horse/",
        "https://trypap.com/",
        "https://maze.toys/",
        "http://drawing.garden/",
        "https://www.movenowthinklater.com/",
        "http://www.republiquedesmangues.fr/",
        "http://www.staggeringbeauty.com/",
        "http://www.rrrgggbbb.com/",
        "https://checkboxrace.com/",
        "https://rotatingsandwiches.com/",
        "http://randomcolour.com/",
    ];

    const randomWebsiteURL = websites[Math.floor(Math.random() * websites.length)];
      
    // Get the current count of websites
    const websiteCount = websites.length;
      
    const websiteEmbed = new EmbedBuilder()
      .setColor("#35393e")
      .setTitle("<:klink:1134998612053602397> 〢 Random Website")
      .setDescription(`>>> Click the button below to visit a random website.\nThere are currently **${websiteCount}** Websites in my Database.`);

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Visit Random Website")
        .setStyle(5)
        .setEmoji('<:klink:1134998612053602397>') // This is for a link button style
        .setURL(randomWebsiteURL), // Set the URL to the random website
    );

    await interaction.reply({
      embeds: [websiteEmbed],
      components: [button],
    });
  },
};