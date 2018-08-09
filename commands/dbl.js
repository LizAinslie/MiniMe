const snekfetch = require('snekfetch');
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
  try {
    const { body } = await snekfetch.get(`https://discordbots.org/api/bots`).query({ limit: 1, search: `username:${args.join(' ')}` });
    if (body.count != 1) return msg.channel.send(`Couldn't find a bot that matched the query \`${args.join(' ')}\``)
    return msg.channel.send(`Here you go!`, { file: `https://discordbots.org/api/widget/${body.results[0].id}.png` })
  } catch (err) {
    msg.channel.send(':exclamation: | Failed to run the command.');
  }
}

exports.help = {
  name: 'dbl',
  description: 'Retrieve bot information from the Discord Bot List.',
  usage: 'dbl <botName>',
  fullDesc: 'Retrieve bot information from the Discord Bot List. Must supply a bot name.',
  type: 'util'
}