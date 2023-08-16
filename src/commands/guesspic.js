const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const User = require("../models/User");
const { connect } = require("mongoose");

// Object to keep track of active rounds in each channel
const activeRounds = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guessthepicture")
    .setDescription("Starts a Guess the Picture Game.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Choose a category")
        .addChoices(
          { name: "Coasters", value: "coasters" },
          { name: "Flags", value: "flags" },
          { name: "Animes", value: "animes" },
          { name: "Games", value: "game" },
          { name: "Movies", value: "movies" },
          { name: "Trains", value: "trains" },
        ),
    )
    .setDmPermission(false),

  async execute(interaction) {
    const categoryData = {
      game: require("./pics/game.json"),
      animes: require("./pics/animes.json"),
      coasters: require("./pics/coasters.json"),
      movies: require("./pics/movies.json"),
      flags: require("./pics/flags.json"),
      trains: require("./pics/trains.json"),
    };

    const category = interaction.options.getString("category");
    const channel = interaction.channel;

    const pro = new EmbedBuilder()
      .setColor("#35393e")
      .setTitle("<:ktime:1135000938021658826> 〢 Slow down!")
      .setDescription(`There's still a Round in progress.`);

    // Check if a round is already in progress in the channel
    if (activeRounds[channel.id]) {
      // Send an invisible message to inform that a round is still running
      await interaction.reply({ embeds: [pro], ephemeral: true });
      return;
    }

    // Mark the channel as having an active round
    activeRounds[channel.id] = true;

    const submitButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Suggest a new Question")
        .setStyle("5")
        .setEmoji("<:kpencil:1134998631787790486>")
        .setURL("https://kenonbot.com/suggest.html"),
    );

    const generateRound = async () => {
      let pictureData;
      if (category && categoryData.hasOwnProperty(category)) {
        pictureData = categoryData[category];
      } else {
        // Choose a random category if none is selected
        const categories = Object.keys(categoryData);
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
        pictureData = categoryData[randomCategory];
      }

      const randomIndex = Math.floor(Math.random() * pictureData.length);
      const randomPicture = pictureData[randomIndex];

      const embed = new EmbedBuilder()
        .setColor("#35393e")
        .setTitle("<:kgame:1134998622296096858> 〢 Guess the Picture!")
        .setDescription(`> Type your Answer in the Chat.`)
        .setImage(randomPicture.pictureLink);

      const playAgainButton = new ButtonBuilder()
        .setLabel("Play Again")
        .setStyle("1")
        .setEmoji("<:kgame:1134998622296096858>")
        .setCustomId("play_again");

      const row = new ActionRowBuilder().addComponents(playAgainButton);

      await interaction.reply({
        embeds: [embed],
        components: [submitButton],
      });

      const time = new EmbedBuilder()
        .setColor("#35393e")
        .setTitle("<:ktime:1135000938021658826> 〢 Time's Up!")
        .setDescription(
          `> The correct answer was **${randomPicture.answer}**.`,
        );

      const wrong = new EmbedBuilder()
        .setColor("#35393e")
        .setDescription(
          "<:kcross:1135001034750709832> **〢 Wrong answer. Try again!**",
        );

      const right = new EmbedBuilder()
        .setColor("#35393e")
        .setTitle("<:kcheck:1135000999212355647> **〢 Correct Answer!**")
        .setDescription(
          "> You've been awarded <:kcoin:1135002536777093170> **`5`** for the correct Answer.",
        );

      let answerFound = false; // Variable to track if the correct answer is found

      const filter = (m) => !m.author.bot; // Ignore messages from bots
      const collector = interaction.channel.createMessageCollector({
        filter,
        time: 14000,
      });

      collector.on("collect", async (m) => {
        if (m.content.toLowerCase() === randomPicture.answer.toLowerCase()) {
          m.reply({ embeds: [right] });
          answerFound = true; // Set answerFound to true
          collector.stop(); // Stop the collector when someone gets the correct answer

          // Update the user's credits
          const userId = m.author.id; // Use the ID of the user who guessed correctly
          let user = await User.findOne({ userId });

          if (user) {
            user.credits += 5; // Increase the credits by 5
          } else {
            user = new User({
              userId,
              credits: 5, // Set initial credits to 5 if the user is not found
            });
          }

          await user.save(); // Save the updated or new user to the database
        } else {
          m.reply({ embeds: [wrong] });
        }
      });

      collector.on("end", () => {
        if (!answerFound) {
          // No correct answer found
          interaction.followUp({ embeds: [time], components: [] });
        }
        // Remove the active round mark from the channel
        delete activeRounds[channel.id];
      });
    };

    const buttonInteraction = async (buttonInteraction) => {
      // Check if a round is already in progress in the channel
      if (activeRounds[channel.id]) {
        // Send an invisible message to inform that a round is still running
        await buttonInteraction.reply({ embeds: [pro], ephemeral: true });
        return;
      }

      if (buttonInteraction.customId === "play_again") {
        buttonInteraction.deferUpdate();
        // Mark the channel as having an active round
        activeRounds[channel.id] = true;
        await generateRound();
      }
    };

    const collector = interaction.channel.createMessageComponentCollector({
      time: 60000,
    });
    collector.on("collect", buttonInteraction);
    collector.on("end", () => {
      // Remove the active round mark from the channel
      delete activeRounds[channel.id];
    });

    await generateRound();
  },
};
