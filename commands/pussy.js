const randomPuppy = require('random-puppy');
const Discord = require('discord.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  snekfetch.get('https://discordbots.org/api/bots/365958655926992896/check')
  .set('Authorization', '') 
  .query({ userId: message.author.id })
  .end((err, res) => {
    console.log(res.body.voted);
    var check = res.body.voted;
    if (check == 1) {
      randomPuppy('pussy').then(url => {
        const embed = new Discord.RichEmbed()
        .setAuthor(`Pussy | requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
        .setColor(client.config.color)
        .setImage(url)
        msg.channel.send(embed)
      })
    } else {
      const embed = new Discord.RichEmbed()
      .setTitle('Upvoters-only Command!')
      .setColor(client.config.color)
      .setURL('https://discordbots.org/bots/')
      .setTimestamp(new Date())
      .addField('Go Upvote Me at', 'https://discordbots.org/bots')
      .setFooter('Status: 403', client.user.avatarURL)
      msg.channel.send(embed)
    }
  })
}

exports.help = {
  name: 'pussy',
  description: 'Gives you a picture of a pussy.',
  usage: 'pussy',
  fullDesc: 'Gives you a picture of a pussy.',
  type: 'nsfw'
}