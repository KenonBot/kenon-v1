module.exports = (client, interaction) => {
  if (!interaction.guild) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      if (command?.requireGuild)
        return interaction.reply({
          content:
            "This command is only usable on a Discord Server!\nYou want to test Kenon? Join the support server!\nhttps://discord.gg/qyAmUsYU35",
          ephemeral: true,
        });

      try {
        command.execute(interaction, client, null);
      } catch (err) {
        if (err) console.error(err);
        return interaction.reply({
          content: "An error occurred while trying to execute that command.",
          ephemeral: true,
        });
      }
    }
  } else {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    command.execute(interaction, client);
  } catch (err) {
    if (err) console.error(err);
    interaction.reply({
      content: "An error occurred while executing that command.",
      ephemeral: true,
    });
  }
  }
};
