/* Eris Fixed */

const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  // find users with specific discriminator
  let matches = [];

  let users = Array.from(msg.guild.members.values()) // online users in same server as client

  for (let member of users) {
    if (member.user.discriminator === args[0]) { // check for matching discrim
      matches.push(member.user.username+"#"+args[0]); // full tag
    }
  }
  if (matches.length === 0) {
    msg.channel.createMessage(":exclamation: │ No matches found.");
  } else {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Discriminator ${args[0]} (${matches.length}) │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL
        },
        timestamp: new Date(),
        color: getEmbedColor(client, msg),
        description: matches.join('\n'),
        footer: {
          text: 'Status: 200',
          icon_url: client.user.avatarURL
        }
      }
    })
  }
}

exports.help = {
  name: 'discrim',
  description: 'Get all the users with a certain discriminator.',
  usage: 'discrim <discriminator>',
  fullDesc: 'Get all the users with a certain discriminator.',
  type: 'util',
  status: 2
}
