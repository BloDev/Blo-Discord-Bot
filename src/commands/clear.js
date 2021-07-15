const Discord = require('discord.js');
const Player = require('../models/playerModel');

module.exports = {
	name: 'clear',
	description: 'clears the 5v5 list',
	async execute(message) {
		try {
			const players = Object.values(await Player.find()).map(dict => dict.username);
			if (!players.length) return message.channel.send('No one is currently in the 5v5...');

			const playerText = players.join(', ');

			const runEmbed = new Discord.MessageEmbed()
				.setColor('#FFA500')
				.setTitle(`Players (${players.length})`)
				.setDescription(playerText);

			message.channel.send(runEmbed);

			await Player.deleteMany({});
			return message.channel.send('Cleared the 5v5 list.');
		} catch {
			return message.channel.send('An error occured with the database...');
		}
	},
};