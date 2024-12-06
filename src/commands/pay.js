const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");

const uri =
  "REPLACE_WITH_YOUR_URI";

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

// Load the font (if needed)
// registerFont('./path/to/font.ttf', { family: 'FontName' });

// ...

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Pay credits to another user.")
    .addUserOption((option) =>
      option
        .setName("recipient")
        .setDescription("The user to pay credits to.")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of credits to pay.")
        .setRequired(true),
    )
    .setDMPermission(false),
  async execute(interaction) {
    const senderId = interaction.user.id;
    const recipient = interaction.options.getUser("recipient");
    const amount = interaction.options.getInteger("amount");

    try {
      const sender = await User.findOne({ userId: senderId });

      if (!sender) {
        const database1 = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription(
            "> You haven't used the Bot before. You cannot pay Credits to other Users.",
          );

        interaction.reply({ embeds: [database1] });
        return;
      }

      if (amount < 0) {
        const invalid1 = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription("> Please use a positive Number.");

        interaction.reply({ embeds: [invalid1] });
        return;
      }

      if (sender.credits < amount) {
        const nocredit = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription("> You do not have enough Credits.");

        interaction.reply({ embeds: [nocredit] });
        return;
      }

      if (senderId === recipient.id) {
        const payself = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription("> You cannot pay yourself.");

        interaction.reply({ embeds: [payself] });
        return;
      }

      const tax = Math.ceil(amount * 0.1);
      const totalAmount = amount + tax;

      if (recipient) {
        const recipientId = recipient.id;
        const recipientUser = await User.findOne({ userId: recipientId });

        if (recipientUser) {
          sender.credits -= totalAmount;

          // Update sender's credits
          await sender.save();

          recipientUser.credits += amount;

          // Update recipient's credits
          await recipientUser.save();

          const sucess = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle("<:kcheck:1135000999212355647> 〢 Successful!")
            .setDescription(
              `> **You paid** <:kenon_coin:1117946111034937424>\`${amount}\` to <@${recipientId}>.\n> **Taxes:** <:kenon_coin:1117946111034937424>\`${tax}\``,
            );

          interaction.reply({ embeds: [sucess] });
        } else {
          const notregistered = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle("<:klist:1134998610044538890> 〢 Error")
            .setDescription("> Recipient has never used the Bot.");

          interaction.reply({ embeds: [notregistered] });
        }
      } else {
        const invalidree = new EmbedBuilder()
          .setColor("#2f3136")
          .setTitle("<:klist:1134998610044538890> 〢 Error")
          .setDescription("> Invalid recipient.");

        interaction.reply({ embeds: [invalidree] });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      interaction.reply(
        "An error occurred while processing the payment. This has been logged.",
      );
    }
  },
};
