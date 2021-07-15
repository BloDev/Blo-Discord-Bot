const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'lists all commands',
	execute(message) {

		const { commands } = message.client;

		const helpDesc = commands.map(command => {

			let usageText;
			let aliasText;

			if (command.aliases) {
				aliasText = command.aliases.join(', ');
			} else {
				aliasText = 'none';
			}

			if (command.usage) {
				usageText = ` ${command.usage}`;
			} else {
				usageText = '';
			}

			return `**${process.env.PREFIX}${command.name}${usageText}:** ${command.description} *(aliases: ${aliasText})*`;

		}).join('\n');

		const embed = new Discord.MessageEmbed()
			.setColor('#00FF00')
			.setTitle('Commands')
			.setDescription(helpDesc);

		return message.channel.send(embed);
	},
};