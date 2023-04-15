const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: "praca",
    permissions: "ManageMessages",
  
  
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(message, args, client) {
      const embed = new EmbedBuilder()
        .setColor("#6a1bab")
        .setTitle("Szukasz pracy")
        .setDescription("Jeżeli poszukujesz pracy kliknij w poniższy przycisk.")
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("twojamatka")
          .setLabel("Kliknij")
          .setStyle(ButtonStyle.Primary)
      );
      message.channel.send({
        embeds: [embed],
        components: [row],
      });
    },
  };