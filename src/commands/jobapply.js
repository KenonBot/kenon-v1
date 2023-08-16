const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const mongoose = require("mongoose");
const path = require("path");
const User = require("../models/User");

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
    .setName("jobapply")
    .setDescription("Apply for a job.")
    .addStringOption((option) =>
      option
        .setName("job")
        .setDescription("The job title you want to apply for.")
        .addChoices(
          { name: "Warehouse Clerk", value: "Warehouse Clerk" },
          { name: "Waiter", value: "Waiter" },
          { name: "Full Stack Developer", value: "Full Stack Developer" },
        )
        .setRequired(true),
    )
    .setDmPermission(false),
  async execute(interaction) {
    const userId = interaction.user.id;
    const jobTitle = interaction.options.getString("job");

    // Check if the job title is valid
    if (!validJobs.includes(jobTitle)) {
      const invalidJob = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("<:klist:1134998610044538890> 〢 Error")
        .setDescription("> Invalid job title.");

      interaction.reply({ embeds: [invalidJob] });
      return;
    }

    try {
      // Check if the user exists and retrieve their data from the User model
      const user = await User.findOne({ userId });
      if (!user) {
        const notRegistered = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription("> You are not registered.");

        interaction.reply({ embeds: [notRegistered] });
        return;
      }

      // Check if the user meets the required amount of successful work shifts for the job
      let requiredAmount;
      switch (jobTitle) {
        case "Waiter":
          requiredAmount = 10;
          break;
        case "Full Stack Developer":
          requiredAmount = 25;
          break;
        default:
          // The warehouse job is always available, so no additional checks needed
          break;
      }

      if (requiredAmount) {
        if (user.successfulWorkShifts < requiredAmount) {
          const notEligible = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle("<:klist:1134998610044538890> 〢 Error")
            .setDescription(
              `> You need at least \`${requiredAmount}\` successful work shifts to apply for the \`${jobTitle}\` job.`,
            );

          interaction.reply({ embeds: [notEligible] });
          return;
        }
      }

      // Check if the user has already applied for the job
      const existingApplication = await JobApplication.findOne({
        userId,
        jobTitle,
      });
      if (existingApplication) {
        const alreadyApplied = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription(
            `> You have already applied for the ${jobTitle} job.`,
          );

        interaction.reply({ embeds: [alreadyApplied] });
        return;
      }

      // Create a new job application entry for the user
      const newApplication = new JobApplication({
        userId,
        jobTitle,
      });
      await newApplication.save();

      const applicationResult = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("<:kcheck:1135000999212355647> 〢 Successful!")
        .setDescription(
          `> You have applied for the \`${jobTitle}\` job. You are now able to use \`/work\`.`,
        );

      interaction.reply({ embeds: [applicationResult] });
    } catch (error) {
      console.error("Error while applying for a job:", error);
      interaction.reply(
        "> An error occurred while applying for a job. This has been logged.",
      );
    }
  },
};
