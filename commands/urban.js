const ud = require('urban-dictionary')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  if (!msg.channel.nsfw) return msg.channel.createMessage(':exclamation: │ You can only run this command in a NSFW channel!')
  ud.term(args.join(' '), (error, entries, tags, sounds) => {
    if (error) {
      Logger.error('[urban.js] urban error.', error)
      msg.channel.createMessage(':exclamation: │ There was an error!')
    } else {
      msg.channel.createMessage({
        embed: {
          color: getEmbedColor(client, msg),
          description: entries[0].definition,
          title: entries[0].word,
          fields: [
            {
              name: 'Example', 
              value: entries[0].example
            }
          ]
        }
      })
    }
  })
}

exports.help = {
  name: 'urban',
  description: 'Search the Urban Dictionary.',
  usage: 'urban <term>',
  fullDesc: 'Search the Urban Dictionary.',
  type: 'nsfw',
  status: 2,
  aliases: ['ud', 'urbandict']
}
