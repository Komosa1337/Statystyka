const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "channel",
  permissions: "ManageChannels",
  async execute(message, args, client) {
    if (!args[0]) return message.reply("Nie podano nowej nazwy kanału!");

    const channel = message.channel;
    const newChannelName = args.join(" ");
    
    await channel.setName(newChannelName);
    
    const embed = new EmbedBuilder()
      .setColor("#9c0800")
      .setAuthor({
        name: "Zmieniono nazwę kanału",
        iconURL: "https://imgur.com/EvFne3O.png",
        url: "https://discord.js.org",
      })
      .setDescription(`Nazwa kanału została zmieniona na **${newChannelName}**`)
      .addFields(
        { name: "Nazwa kanału", value: channel.name, inline: true },
        { name: "ID kanału", value: channel.id, inline: true },
        { name: "Data utworzenia kanału", value: channel.createdAt.toLocaleString(), inline: true }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};