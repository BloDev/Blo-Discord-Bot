const mongoose = require('mongoose');
const Player = require('../models/playerModel');

module.exports = {
	name: 'join',
	description: 'joins the 5v5',
	aliases: ['5v5', 'frag'],
	async execute(message) {
		try {
			const playerExists = await Player.exists({ user_id: message.author.id, guild_id: message.guild.id });
			if (!playerExists) {
				await Player.create({
					_id: new mongoose.Types.ObjectId(),
					user_id: message.author.id,
					guild_id: message.guild.id,
					username: message.author.username,
				});
				return message.reply('You are now ready to frag.');
			}
			return message.reply('You are already in the 5v5...');
		} catch (e) {
			console.error(e);
			message.channel.send('An error occured with the database...');
		}
	},
};