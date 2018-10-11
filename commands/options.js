/* Eris Fixed */

const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  client.r.table('serverSettings').get(msg.guild.id).run((error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (settings) {
      client.r.table('users').get(msg.author.id).run().then(user => {
        if (!msg.member.permission.has('manageGuild') && !user.developer) return msg.channel.createMessage(':no_entry_sign: │ You do not have permission to use this! you need `MANAGE_SERVER` permission.')
        switch (args[0].toLowerCase()) {
          case 'welcomes':
            let welcomes = Boolean(parseInt(args[1].trim(), 10))
            client.r.table('serverSettings').get(msg.guild.id).update({
              doWelcomes: welcomes
            })
            msg.channel.createMessage({
              embed: {
                title: 'Server Options Updated',
                color: getEmbedColor(client, msg),
                fields: [
                  {
                    name: 'Value Changed',
                    value: 'Welcomes',
                    inline: true
                  },
                  {
                    name: 'Changed to',
                    value: welcomes.toString(),
                    inline: true
                  }
                ]
              }
            })
            break
          case 'logs':
            let logs = Boolean(parseInt(args[1].trim(), 10))
            client.r.table('serverSettings').get(msg.guild.id).update({
              doLogs: logs
            })
            msg.channel.createMessage({
              embed: {
                title: 'Server Options Updated',
                color: getEmbedColor(client, msg),
                fields: [
                  {
                    name: 'Value Changed',
                    value: 'Logs',
                    inline: true
                  },
                  {
                    name: 'Changed to',
                    value: logs.toString(),
                    inline: true
                  }
                ]
              }
            })
            break
          default:
            msg.channel.createMessage(':interrobang: │ You need to specify either `logs` or `welcomes` as a value to change!')
        }
      })
    } else {
      msg.channel.createMessage(':exclamation: │ Please run `' + client.config.prefix + 'setup` to setup your server first!')
    }
  })
}

exports.help = {
  name: 'options',
  description: 'Configure your server options.',
  usage: 'options <logs|welcomes> <1|0>',
  fullDesc: 'Configure your server options. 0=False, 1=True',
  type: 'mod',
  status: 2,
  aliases: ['opts']
}
