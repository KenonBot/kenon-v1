const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "REPLACE_WITH_YOUR_URI",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Create a schema for redeemed codes
const redeemedCodeSchema = new mongoose.Schema({
  code: String,
});

// Create a model based on the schema
const RedeemedCode = mongoose.model("RedeemedCode", redeemedCodeSchema);

// Import the User model
const User = require("../models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("redeem")
    .setDescription("Redeem a code")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The code to redeem")
        .setRequired(true),
    )
    .setDMPermission(false),

  async execute(interaction, client) {
    const codeToRedeem = interaction.options.getString("code");
    const userId = interaction.user.id;

    // Construct the file path for redeemcodes.txt
    const filePath = path.join(__dirname, "redeemcodes.txt");

    // Read the codes from the text file
    const codes = fs.readFileSync(filePath, "utf8").split("\n");

    // Check if the code exists in the file
    if (!codes.includes(codeToRedeem)) {
      return interaction.reply("This code is not valid.");
    }

    // Check if the code has already been redeemed
    const redeemedCode = await RedeemedCode.findOne({ code: codeToRedeem });
    if (redeemedCode) {
      return interaction.reply("This code has already been redeemed.");
    }

    // Update the user's credits
    const user = await User.findOne({ userId });
    if (!user) {
      // Handle case when user is not found
      return interaction.reply("User not found.");
    }

    // Assign 500 credits to the user
    user.credits += 150;

    // Save the updated user back to the database
    await user.save();

    // Store the redeemed code in the database
    const newRedeemedCode = new RedeemedCode({ code: codeToRedeem });
    await newRedeemedCode.save();

    const pingembed = new EmbedBuilder()
      .setColor("#35393e")
      .setTitle("<:kcheck:1135000999212355647> 〢 Code Redeemed!")
      .setDescription(
        `> <:klink:1134998612053602397> **|** \`${codeToRedeem}\`\n> <:kenon_gift:1114286382463057940> **|** \`150\`\n> <:kgift:1134998617996935198> **|** \`${user.credits}\``,
      )
      .setThumbnail(interaction.user.displayAvatarURL());

    await interaction.reply({
      embeds: [pingembed],
    });
  },
};
