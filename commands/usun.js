const { Permissions } = require("discord.js");

module.exports = {
  name: "usun",
  permissions: "MANAGE_MESSAGES",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(message, args, client) {
    if (!args[0]) {
      return message.reply("Nie podano ilości wiadomości do usunięcia!");
    }

    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply("Podana wartość nie jest liczbą!");
    }

    if (amount < 1 || amount > 100) {
      return message.reply("Podaj wartość pomiędzy 1 a 100!");
    }

    try {
      await message.channel.bulkDelete(amount, true);
      message.channel.send(`Usunięto ${amount} wiadomości!`).then(msg => msg.delete({ timeout: 400000 }));
    } catch (err) {
      console.error(err);
      message.channel.send("Wystąpił błąd podczas usuwania wiadomości!");
    }
  },
};