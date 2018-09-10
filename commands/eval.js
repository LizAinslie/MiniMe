/* eslint no-eval: 0 */
const formatArbitrary = require('../util/formatArbitrary.js')
const uploadToHastebin = require('../util/uploadToHastebin.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

const clean = text => {
  if (typeof text === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  } else {
    return text
  }
}

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) { return message.channel.createMessage(':no_entry_sign: │ Only my developer can use this!') }
  let code
  try {
    code = args.join(' ')
    let evaled = await eval(code)

    if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled) }

    if (formatArbitrary(client, clean(evaled)).length > 1992) {
      uploadToHastebin(formatArbitrary(client, clean(evaled))).then((url) => {
        message.channel.createMessage(':outbox_tray: │ ' + url)
      }).catch((error) => {
        message.channel.createMessage(':exclamation: │ Failed to upload result to hastebin. `' + error.message + '`')
      })
    } else {
      message.channel.createMessage({
        embed: {
          author: {
            name: `Eval │ Requested by ${message.author.username}#${message.author.discriminator}`,
            icon_url: message.author.displayAvatarURL
          },
          footer: {
            text: 'Status: 200',
            icon_url: client.user.avatarURL
          },
          timestamp: new Date(),
          color: getEmbedColor(message),
          fields: [
            {
              name: ':inbox_tray: │ Input',
              value: '```js\n' + code + '```'
            },
            {
              name: ':outbox_tray: │ Output',
              value: '```js\n' + formatArbitrary(client, clean(evaled)) + '```'
            }
          ]
        }
      })
    }
  } catch (err) {
    message.channel.createMessage({
      embed: {
        author: {
          name: `Eval │ Requested by ${message.author.username}#${message.author.discriminator}`,
          icon_url: message.author.avatarURL
        },
        footer: {
          text: 'Status: 200',
          icon_url: client.user.avatarURL
        },
        timestamp: new Date(),
        color: getEmbedColor(client, message),
        fields: [
          {
            name: ':inbox_tray: │ Input',
            value: '```js\n' + code + '```'
          },
          {
            name: ':outbox_tray: │ Error',
            value: `\`\`\`js\n${formatArbitrary(client, clean(err))}\n\`\`\``
          }
        ]
      }
    })
  }
}

exports.help = {
  name: 'eval',
  description: 'Evaluates JavaScript.',
  usage: 'eval <code>',
  fullDesc: `Evaluates Javascript. Can only be used by my developer. :P`,
  type: 'dev',
  status: 2
}
