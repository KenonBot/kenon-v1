const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const mongoose = require("mongoose");
const path = require("path");

// Assuming you already have the User model defined from the previous code

// Define the job application schema
const jobApplicationSchema = new mongoose.Schema({
  userId: String,
  jobTitle: String,
});

// Check if the model already exists before creating it
const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", jobApplicationSchema);

// ...

// Valid job titles
const validJobs = ["Warehouse Clerk", "Waiter", "Full Stack Developer"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jobleave")
    .setDescription("Leave your current job.")
    .setDMPermission(false),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      // Check if the user has a job application
      const existingApplication = await JobApplication.findOne({ userId });

      if (!existingApplication) {
        const noJob = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("><:klist:1134998610044538890> 〢 Error")
          .setDescription("> You do not have any active job.");

        interaction.reply({ embeds: [noJob] });
        return;
      }

      // Remove the job application from the database
      await existingApplication.deleteOne();

      const jobLeft = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("<:kcheck:1135000999212355647> 〢 Successful!")
        .setDescription("> You have left your job.");

      interaction.reply({ embeds: [jobLeft] });
    } catch (error) {
      console.error("Error leaving job:", error);
      interaction.reply(
        "> An error occurred while leaving your job. This has been logged.",
      );
    }
  },
};
