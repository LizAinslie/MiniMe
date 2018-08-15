const randomPuppy = require('random-puppy');
const Discord = require('discord.js')
const superagent = require('superagent')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  superagent
  .get('https://discordbots.org/api/bots/365958655926992896/check')
  .set('Authorization', client.config.apis.botlists.dbl) 
  .query({ userId: msg.author.id })
  .end((err, res) => { 
  const check = res.body.voted;
  if (check == 1) {
    randomPuppy('pussy').then(url => {
      const embed = new Discord.RichEmbed()
      .setAuthor(`Pussy | requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
      .setColor(client.config.color)
      .setImage(url)
      msg.channel.send(embed)
    })
  } else {
    message.channel.send({embed: 
      {
        title: "Upvoters-Only Command",
        url: "https://discordbots.org/bot/luki/vote",
        description: "This command is available only for upvoters",
        fields: [
          {
            name: "Go upvote at",
            value: "https://discordbots.org/bot/luki/vote"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Status: 403"
        }
      }
    });
  }
}

exports.help = {
  name: 'pussy',
  description: 'Gives you a picture of a pussy.',
  usage: 'pussy',
  fullDesc: 'Gives you a picture of a pussy.',
  type: 'nsfw'
}