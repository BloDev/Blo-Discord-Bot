const Discord = require('discord.js');
const Player = require('../models/playerModel');

function shuffle(array) {

	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

module.exports = {
	name: 'run',
	description: 'runs the 5v5',
	aliases: ['generate', 'teams'],
	async execute(message) {
		if (message.channel.type === 'dm') return message.channel.send('This command only works within a server.');
		try {
			const players = Object.values(await Player.find({ guild_id: message.guild.id })).map(dict => dict.username);

			if (players.length < 10) return message.channel.send('There NEEDS to be 10 players... GET ON!');
			if (players.length > 10) return message.channel.send('There are too many fraggers... Please remove some players!');

			shuffle(players);

			const teamA = players.slice(0, 5).join(', ');
			const teamB = players.slice(5).join(', ');

			const embed = new Discord.MessageEmbed()
				.setColor('#FF0000')
				.setTitle('Teams')
				.setDescription(`Team One: ${teamA}\nTeam Two: ${teamB}`);

			return message.channel.send(embed);
		} catch (e) {
			console.error(e);
			return message.channel.send('An error occured with the database...');
		}
	},
};