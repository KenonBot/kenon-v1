const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const mongoose = require("mongoose");
const path = require("path");
const User = require("../models/User"); // Import the User model from the correct file path
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
// Cooldown duration in milliseconds (90 minutes)
const cooldownDuration = 90 * 60 * 1000;

// Create a Map to store the timestamps of users' last work
const cooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Work and earn credits based on your job.")
    .setDmPermission(false),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      // Check if the user has a job application
      const existingApplication = await JobApplication.findOne({ userId });

      if (!existingApplication) {
        const noJob = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription(
            "> You do not have any active job. Use `/jobapply` to apply for a job.",
          );

        interaction.reply({ embeds: [noJob] });
        return;
      }

      // Check if the user is on cooldown for the "/work" command
      const lastWorkedAt = cooldowns.get(userId);

      if (lastWorkedAt && Date.now() - lastWorkedAt < cooldownDuration) {
        const cooldownRemaining = Math.floor(
          (cooldownDuration - (Date.now() - lastWorkedAt)) / (60 * 1000),
        );
        const onCooldown = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription(
            `> You are on cooldown. You can work again after \`${cooldownRemaining}\` minutes.`,
          );

        interaction.reply({ embeds: [onCooldown] });
        return;
      }

      // Calculate credits based on the job
      let creditsEarned = 0;
      const jobTitle = existingApplication.jobTitle;
      switch (jobTitle) {
        case "Warehouse Clerk":
          creditsEarned = 30;
          break;
        case "Waiter":
          creditsEarned = 45;
          break;
        case "Full Stack Developer":
          creditsEarned = 70;
          break;
        default:
          // If the job title is not recognized, reply with an error
          const invalidJob = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle("<:klist:1134998610044538890> 〢 Error")
            .setDescription("> Invalid job title.");

          interaction.reply({ embeds: [invalidJob] });
          return;
      }

      // Update the user's successful work shifts
      const user = await User.findOne({ userId });
      if (user) {
        user.successfulWorkShifts += 1;
        await user.save();
      }

      // Check if the user is eligible to apply for a job
      const eligibleJobs = [];
      if (user.successfulWorkShifts >= 10) {
        eligibleJobs.push("Waiter");
      }
      if (user.successfulWorkShifts >= 25) {
        eligibleJobs.push("Full Stack Developer");
      }

      // Update the cooldowns Map with the current timestamp
      cooldowns.set(userId, Date.now());

      // Retrieve the user's current credits from the User model
      const currentCredits = user ? user.credits : 0;

      // Add earned credits to the user's account
      const updatedCredits = currentCredits + creditsEarned;

      // Save the updated credits back to the database (optional, if you want to persist the credits)
      if (user) {
        user.credits = updatedCredits;
        await user.save();
      }

      const workResult = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("<:kcheck:1135000999212355647> 〢 Successful!")
        .setDescription(
          `> You have worked as a ${jobTitle} and earned <:kcoin:1135002536777093170>\`${creditsEarned}\` credits. Your total credits: <:kcoin:1135002536777093170>\`${updatedCredits}\``,
        );

      // Show eligible jobs in the reply message
      if (eligibleJobs.length > 0) {
        workResult.addField(
          "> **Eligible to apply for:**",
          eligibleJobs.join(", "),
        );
      }

      interaction.reply({ embeds: [workResult] });
    } catch (error) {
      console.error("Error while working:", error);
      interaction.reply(
        "> An error occurred while working. This has been logged.",
      );
    }
  },
};
