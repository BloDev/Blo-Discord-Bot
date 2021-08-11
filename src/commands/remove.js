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
    if (message.channel.type === 'dm') return message.channel.send('This command only works within a server.');
    if (args[0]) {
      try {
        const user = await getUserFromMention(client, args[0]);
        if (!user) return message.channel.send(`Please refer to a valid user to remove.\nThe correct command format is: **${process.env.PREFIX}${this.name} ${this.usage}**`);
        try {
          const playerExists = await Player.exists({ user_id: user.id, guild_id: message.guild.id });
          if (playerExists) {
            await Player.deleteOne({ user_id: user.id, guild_id: message.guild.id });
            return message.channel.send(`Removed ${user.username}.`);
          }
          return message.channel.send(`${user.username} is not even in the 5v5...`);
        } catch (e) {
          console.error(e);
          return message.channel.send('An error occured with the database...');
        }
      } catch (e) {
        return message.channel.send(`Please refer to a valid user to remove.\nThe correct command format is: **${process.env.PREFIX}${this.name} ${this.usage}**`);
      }
    }
    return message.channel.send(`Please use the correct command format: **${process.env.PREFIX}${this.name} ${this.usage}**`);
  },
};