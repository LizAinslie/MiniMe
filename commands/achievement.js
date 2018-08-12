const Discord = require('discord.js')
const snekfetch = require('snekfetch');
const cooldown = new Set();
exports.run = (client, message, args) => {
  try {
    let [title, contents] = args.join(" ").split("|");
    if(!contents) {
      [title, contents] = ["Achievement Get!", title];
    }
      
    let rnd = Math.floor((Math.random() * 39) + 1);
    if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
    if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
    if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

    if(title.length > 20 || contents.length > 20) return message.edit("Max Length: 20 Characters. Soz.").then(message.delete.bind(message), 2000);
    const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
    snekfetch.get(url)
    let mcaembed = new Discord.RichEmbed()
    .setDescription(`**${message.author.username}** Achievement!`)
    .setColor(`GREEN`)
    .setImage(url)
    message.channel.send(mcaembed)
  } catch(err) {
    const errorlogs = client.channels.get('464424869497536512')
    message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)
    client.rollbar.error(`Error on achievement commands!\n\nError:\n\n ${err}`)
  }
}

exports.help = {
  name: 'achievement',
  description: 'Generate a Minecraft achievement.',
  usage: 'achievement <title> [contents]',
  fullDesc: 'Generate a Minecraft achievement.',
  type: 'fun'
}