const Player = require('../models/playerModel');

module.exports = {
  name: 'leave',
  description: 'leaves the 5v5',
  aliases: ['exit', 'quit'],
  async execute(message) {
    if (message.channel.type === 'dm') return message.channel.send('This command only works within a server.');
    try {
      const playerExists = await Player.exists({ user_id: message.author.id, guild_id: message.guild.id });
      if (playerExists) {
        await Player.deleteOne({ user_id: message.author.id, guild_id: message.guild.id });
        return message.reply('I am disappointed in you...');
      }
      return message.reply('you aren\'t in the 5v5...');
    } catch (e) {
      console.error(e);
      return message.channel.send('An error occured with the database...');
    }
  },
};