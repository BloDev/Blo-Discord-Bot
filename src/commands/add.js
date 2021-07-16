const mongoose = require('mongoose');
const Player = require('../models/playerModel');

function getUserFromMention(client, mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.fetch(mention);
	}
}

module.exports = {
	name: 'add',
	description: 'adds @user to the 5v5 list',
	usage: ['[@user]'],
	async execute(message, args, client) {
		if (args[0]) {
			try {
				const user = await getUserFromMention(client, args[0]);
				if (!user) return message.channel.send(`Please refer to a valid user to add.\nThe correct command format is: **${process.env.PREFIX}${this.name} ${this.usage}**`);
				if (user.bot) return message.channel.send('You cannot add me.');
				const playerExists = await Player.exists({ user_id: user.id, guild_id: message.guild.id });
				if (!playerExists) {
					await Player.create({
						_id: new mongoose.Types.ObjectId(),
						user_id: user.id,
						guild_id: message.guild.id,
						username: user.username,
					});
					return message.channel.send(`Added ${user.username}.`);
				}
				return message.channel.send(`${user.username} is already in the 5v5...`);
			} catch (e) {
				console.error(e);
				return message.channel.send(`Please refer to a valid user to add.\nThe correct command format is: **${process.env.PREFIX}${this.name} ${this.usage}**`);
			}
		}
		return message.channel.send(`Please use the correct command format: **${process.env.PREFIX}${this.name} ${this.usage}**`);
	},
};