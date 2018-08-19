const snek = require('snekfetch');
const Discord = require('discord.js');

exports.run = (client, message) => {
  snek.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random").then(r => {
    message.channel.send(r.body.message)
  })
};

exports.help = {
  name: "trump",
  description: "Trump quotes generator",
  usage: "trump",
  fullDesc: 'Trump quotes generator',
  type: "fun"
};