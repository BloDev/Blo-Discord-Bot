const Discord = require('discord.js');
const Player = require('../models/playerModel');

module.exports = {
	name: 'list',
	description: 'lists the players currently in the 5v5',
	aliases: ['players', 'fraggers'],
	async execute(message) {
		try {
			const players = Object.values(await Player.find()).map(dict => dict.username);
			const playerText = players.join(', ');

			const runEmbed = new Discord.MessageEmbed()
				.setColor('#FFA500')
				.setTitle(`Players (${players.length})`)
				.setDescription(playerText);

			message.channel.send(runEmbed);
		} catch {
			message.channel.send('An error occured with the database...');
		}
	},
};