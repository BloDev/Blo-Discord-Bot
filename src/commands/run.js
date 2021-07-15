const Discord = require('discord.js');
const Player = require('../models/playerModel');

function shuffle(array) {

	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
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
		try {
			const players = Object.values(await Player.find()).map(dict => dict.username);

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
		} catch {
			return message.channel.send('An error occured with the database...');
		}
	},
};