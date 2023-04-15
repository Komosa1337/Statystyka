const { Client, Message, EmbedBuilder, Collection } = require("discord.js");
const { PREFIX } = require("../../config");


module.exports = {
	name: "messageCreate",
	/**
	 * @param {Client} client
	 * @param {Message} message
	 */
	async execute(message, client) {
		client.pings.set(message.author.id, new Date().getTime());
		if (!message.content.startsWith(PREFIX) || message.author.bot) return;

		const args = message.content.slice(PREFIX.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
			);

		if (!command) return;

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				const BrakPermisji = new EmbedBuilder()
					.setAuthor({name: "ERROR!"})
					.setDescription("Nie posiadasz uprawnień do tej komedy")
					.setColor("#111111");
				return message.reply({ embeds: [BrakPermisji] }).then((sent) => {
					setTimeout(() => {
						sent.delete();
					}, 5000);
				});
			}
		}


		if (command.ownerOnly == true && message.author.id !== "") {
			return client.error(message, "");
		}

		try {
			await command.execute(message, args, client);
		} catch (err) {
			client.error(message, `Wystąpił nie oczekiwany błąd`);

			throw err;
		}
	},
};
