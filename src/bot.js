require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const PREFIX = process.env.PREFIX;
const fs = require('fs');
const cmdFiles = fs.readdirSync('./src/commands/');

client.commands = new Discord.Collection();

for (const file of cmdFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.username} is now online.`);
});

client.on('message', message => {

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.substring(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    command.execute(message, args, client);
  } catch (e) {
    console.error(e);
    message.reply('An error occured trying to execute the command.');
  }
});

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch(e => {
    console.error('Failed to connect to the database.\n', e);
  });

client.login(process.env.TOKEN);