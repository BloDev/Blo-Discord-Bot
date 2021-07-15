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
	name: 'remove',
	description: 'removes @user from the 5v5 list',
	usage: ['[@user]'],
	async execute(message, args, client) {
		if (args[0]) {
			try {
				const user = await getUserFromMention(client, args[0]);
				if (!user) return message.channel.send(`Please refer to a valid user to remove.\nThe correct command format is: **${process.env.PREFIX}${this.name} ${this.usage}**`);
				const playerExists = await Player.exists({ _id: user.id, guild_id: message.guild.id });
				if (playerExists) {
					await Player.deleteOne({ _id: user.id, guild_id: message.guild.id });
					return message.channel.send(`Removed ${user.username}.`);
				}
				return message.channel.send(`${user.username} is not even in the 5v5...`);
			} catch {
				return message.channel.send('An error occured with the database...');
			}
		}
		return message.channel.send(`Please use the correct command format: **${process.env.PREFIX}${this.name} ${this.usage}**`);
	},
};