const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const connection = require('../database/database');

module.exports = {
  name: "uzytkownik",
  permissions: "ManageMessages",
  async execute(message, args, client) {
    const user = message.mentions.users.first() || message.author;
    const guild = message.guild;
    const joinedAt = guild.members.cache.get(user.id).joinedAt;
    const channel = message.channel;
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
    const embed = new EmbedBuilder()
      .setColor("#9c0800")
      .setAuthor({
        name: "Wszelakie informacje o użytkowniku.",
        iconURL: "https://imgur.com/EvFne3O.png",
        url: "https://discord.js.org",
          
      })
          .setDescription(`**Informacje o użytkowniku:** ${user.username}#${user.discriminator}`)
      .addFields(
        { name: "ID Użytkownika", value: user.id },
        { name: "Posiada rangi", value: guild.members.cache.get(user.id).roles.cache.map((role) => role.name).join(", ") },
                  { name: "Czy jest botem", value: user.bot ? "Tak" : "Nie" },
        { name: "Założenia konta", value: formatDate(user.createdAt) },
        { name: "Dołączenia na serwer", value: formatDate(joinedAt) },
        { name: '\u200B', value: '\u200B' },
        { name: "Nazwa kanału", value: message.channel.name },
        { name: "ID kanału", value: message.channel.id },
          { name: "Data utworzenia kanału", value: channel.createdAt.toLocaleString() }
          
      )
      .setThumbnail(user.displayAvatarURL())
    
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};