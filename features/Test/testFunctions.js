const {
  TextInputStyle,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
} = require("discord.js");

module.exports.run = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.customId === "test_button") {
      //   const modal = new TextInputBuilder()
      const modal = new ModalBuilder()
        .setTitle("Składanie zamówienia")
        .setCustomId("test_modal")

      const textInput1 = new TextInputBuilder()
        .setCustomId("option_1")
        .setLabel("Imię i nazwisko")
        .setStyle(TextInputStyle.Short);

      const textInput2 = new TextInputBuilder()
        .setCustomId("option_2")
        .setLabel("Numer telefonu")
        .setStyle(TextInputStyle.Paragraph);

      const textInput3 = new TextInputBuilder()
        .setCustomId("option_3")
        .setLabel("Numer konta bankowego")
        .setStyle(TextInputStyle.Short);

      const firstActionRow = new ActionRowBuilder().addComponents(textInput1);
      const secondActionRow = new ActionRowBuilder().addComponents(textInput2);
      const thirdActionRow = new ActionRowBuilder().addComponents(textInput3)

      modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

      interaction.showModal(modal);
    }

    if (interaction.customId === "twojamatka") {
     const channel = interaction.guild.channels.cache.get('1087345801912651886')
     channel.send(`${interaction.user} poszukuje pracy!`)
    }
  });
};