const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Wyświetla dostępne komendy.'),
  async execute(interaction) {
    const commands = interaction.client.commands;

    const embed = {
      color: '#0099ff',
      title: 'Dostępne komendy:',
      fields: commands.map(command => ({
        name: `/${command.data.name}`,
        value: command.data.description,
      })),
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embed] });
  },
};