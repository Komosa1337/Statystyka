const {
  EmbedBuilder,
  ChannelType,
  PermissionsBitField,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const connection = require('../../database/database')

module.exports.run = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    // INPUT TEXT MODAL
    const text = interaction.fields.getTextInputValue("option_1");
    const text2 = interaction.fields.getTextInputValue("option_2");
    const text3 = interaction.fields.getTextInputValue("option_3");

    // INTERACTION MODAL
    if (interaction.customId === "test_modal") {
      console.log('Imie i Nazwisko',text)
      console.log('Numer konta bankowego', text2)
      console.log('Numer telefonu', text3)
      connection.query(`INSERT INTO users(name, phone, bank) VALUES (?, ?, ?)`, [text, text2, text3], (err, result) => {
        if(err) throw err;
      })
    }
  });
};
