const { EmbedBuilder } = require("discord.js");
const connection = require('../database/database');

module.exports = {
  name: "nieobecnosc",
  permissions: "ManageMessages",
  async execute(message, args, client) {
    const [name, startDate, endDate] = args;

    if (!name || !startDate || !endDate) {
      return message.channel.send(
        "Nieprawidłowe użycie komendy. Poprawne użycie to: `/nieobecnosc Imię nazwisko, Data rozpoczęcia, Data zakończenia`"
      );
    }

    const formatDate = (date) => {
      const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
      const months = [
        "Stycznia",
        "Lutego",
        "Marca",
        "Kwietnia",
        "Maja",
        "Czerwca",
        "Lipca",
        "Sierpnia",
        "Września",
        "Października",
        "Listopada",
        "Grudnia",
      ];
      return `${daysOfWeek[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} o godzinie ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };
    const user = message.mentions.users.first() || message.author;
    const embed = new EmbedBuilder()
      .setColor("#9c0800")
      .setAuthor({
        name: "Nieobecność",
        iconURL: "https://imgur.com/EvFne3O.png",
        url: "https://discord.js.org",
      })
      .setDescription(`**Informacje o nieobecności użytkownika ${user.username}#${user.discriminator}**`)
      .addFields(
        { name: "Imię i nazwisko", value: name, inline: true },
        { name: "Data rozpoczęcia", value: startDate, inline: true },
        { name: "Data zakończenia", value: endDate, inline: true }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};