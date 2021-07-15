const Player = require('../models/playerModel');

module.exports = {
	name: 'join',
	description: 'joins the 5v5',
	aliases: ['5v5', 'frag'],
	async execute(message) {
		try {
			const playerExists = await Player.exists({ _id: message.author.id });
			if (!playerExists) {
				await Player.create({
					_id: message.author.id,
					username: message.author.username,
				});
				return message.reply('You are now ready to frag.');
			}
			return message.reply('You are already in the 5v5...');
		} catch {
			message.channel.send('An error occured with the database...');
		}
	},
};