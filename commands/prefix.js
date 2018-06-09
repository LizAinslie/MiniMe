const fs = require('fs')
const config = require('../config.json')

exports.run = (client, message, args) => {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newPrefix = args[0]
  // change the configuration in memory
  config.prefix = newPrefix

  // Now we have to save the file.
  fs.writeFile('../config.json', JSON.stringify(config), (err) => console.error(err))

  // Now we notify the user that they have successfully changed the prefix.
  message.channel.send('Changed the prefix to `' + newPrefix + '`.')
}

exports.help = {
  name: 'prefix',
  description: "Changes the bot's command prefix.",
  usage: 'prefix <prefix>',
  fullDesc: "Changes the bot's command prefix. Default prefix is `m!`."
}
