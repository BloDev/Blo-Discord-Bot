const Discord = require('discord.js');
const Player = require('../models/playerModel');

module.exports = {
  name: 'list',
  description: 'lists the players currently in the 5v5',
  aliases: ['players', 'fraggers'],
  async execute(message) {
    if (message.channel.type === 'dm') return message.channel.send('This command only works within a server.');
    try {
      const players = Object.values(await Player.find({ guild_id: message.guild.id })).map(dict => dict.username);
      const playerText = players.join(', ');

      const embed = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle(`Players (${players.length})`)
        .setDescription(playerText);

      return message.channel.send(embed);
    } catch (e) {
      console.error(e);
      return message.channel.send('An error occured with the database...');
    }
  },
};