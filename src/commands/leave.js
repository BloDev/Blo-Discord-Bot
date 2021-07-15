const Player = require('../models/playerModel');

module.exports = {
	name: 'leave',
	description: 'leaves the 5v5',
	aliases: ['exit', 'quit'],
	async execute(message) {
		try {
			const playerExists = await Player.exists({ _id: message.author.id });
			if (playerExists) {
				await Player.findByIdAndDelete(message.author.id);
				return message.reply('Jonathan "EliGE" Jablonowski is disappointed in you...');
			}
			return message.reply('You aren\'t even in the 5v5...');
		} catch {
			return message.channel.send('An error occured with the database...');
		}
	},
};