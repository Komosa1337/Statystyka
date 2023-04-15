const color = require('colors-cli/safe')
console.log('=>', color.magenta_bt.underline('URUCHOMIONO' + color.yellow(' POMYŚLNIE')));
const { GatewayIntentBits, Collection, Client } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  allowedMentions: { repliedUser: false },
});

client.pings = new Collection();
client.commands = new Collection();

fs.readdirSync("./Handlers").forEach((handler) =>
  require(`./Handlers/${handler}`)(client)
);
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || !interaction.guild) return;

  if (interaction.commandName === 'help') {
    // Wyświetla listę dostępnych komend
    return require('./commands/help').execute(interaction);
  }

});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '/') {
    // Wyświetla listę dostępnych komend
    const commands = client.commands.map(command => `/${command.data.name}`).join('\n');
    await message.channel.send(`Dostępne komendy:\n${commands}`);
  }

  // Obsługuje pozostałe wiadomości
  // ...
});

client.login(require("./config").TOKEN);