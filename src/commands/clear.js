const Discord = require('discord.js');
const Player = require('../models/playerModel');

module.exports = {
  name: 'clear',
  description: 'clears the 5v5 list',
  async execute(message) {
    if (message.channel.type === 'dm') return message.channel.send('This command only works within a server.');
    try {
      const players = Object.values(await Player.find({ guild_id: message.guild.id })).map(dict => dict.username);
      if (!players.length) return message.channel.send('No one is currently in the 5v5...');

      const playerText = players.join(', ');

      const embed = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle(`Players (${players.length})`)
        .setDescription(playerText);

      message.channel.send(embed);

      await Player.deleteMany({ guild_id: message.guild.id });
      return message.channel.send('Cleared the 5v5 list.');
    } catch (e) {
      console.error(e);
      return message.channel.send('An error occured with the database...');
    }
  },
};