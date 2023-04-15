const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "restartcs",
  description: "Restart the bot",
  execute(message, args, client) {
    if (message.author.id !== "902284012838584390") { // replace YOUR_USER_ID with your Discord user ID
      return message.reply("Nie masz uprawnień do używania tej komendy!");
    }
    message.channel.send("Restartowanie bota...").then(() => {
      process.exit(0); // restart the process
    });
  },
};