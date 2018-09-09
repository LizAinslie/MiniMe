const snekfetch = require('snekfetch')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  snekfetch.get('https://talaikis.com/api/quotes/random/').then((result) => {
    msg.channel.send(':scroll: │ ' + result.body.quote + ' — *' + result.body.author + '*')
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    Logger.error(`[quote.js] snekfetch error.`, error)
  })
}

exports.help = {
  name: 'quote',
  description: 'Fetches a random quote.',
  usage: 'quote',
  fullDesc: 'Fetches a random quote.',
  type: 'util',
  status: 2
}
