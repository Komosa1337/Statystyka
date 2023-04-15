const { readdirSync } = require('fs')

module.exports = (client) => {
    const commandFolders = readdirSync('./commands');
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./commands/`).filter(files => files.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);

            command.category = folder.charAt(0).toUpperCase() + folder.toLowerCase().slice(1)

            client.commands.set(command.name, command);
        };
    };
};