const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:SixrYaxUeu8KwDhA@cluster0.rayv48e.mongodb.net/?retryWrites=true&w=majority";

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: String,
  credits: Number,
});

// Check if the model already exists before creating it
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Check if the MongoDB connection is open, and connect if not
if (mongoose.connection.readyState !== 1) {
  connectToMongoDB();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Check your profile.")
    .setDMPermission(false),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      const user = await User.findOne({ userId });

      if (user) {
        const credits = user.credits;
        const workshift = user.successfulWorkShifts;
        const leaderboardRank =
          (await User.countDocuments({ credits: { $gt: user.credits } })) + 1;

        const creditE = new EmbedBuilder()
          .setTitle("<:khuman:1135001368185286726> 〢 Profile")
          .setDescription(
            `> <:kcoin:1135002536777093170> **| Credits:** \`${credits}\`\n> <:klist:1134998610044538890> **| Rank:** \`#${leaderboardRank}\`\n> <:klift:1135001245086658580> **| Workshifts:** \`${workshift}\``,
          )
          .setThumbnail(interaction.user.displayAvatarURL());

        interaction.reply({ embeds: [creditE] });
      } else {
        interaction.reply({ content: "You have no credits.", epheremal: true });
      }
    } catch (error) {
      console.error("Error retrieving credits:", error);
      interaction.reply("An error occurred while retrieving credits.");
    }
  },
};
