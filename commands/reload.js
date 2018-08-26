const config = require('../config.json')

exports.run = (client, message, args) => {
  if (message.author.id !== config.ownerID) return message.reply('Only my developer can use this command.')
  if (!args || args.size < 1) return message.reply('Must provide a command name to reload.')
  // the path is relative to the *current folder*, so just ./filename.js
  if (args[0].toLowerCase() === 'music') return delete require.cache[require.resolve(`../music.js`)]
  if (args[0].toLowerCase() === 'config') return delete require.cache[require.resolve(`../config.json`)]
  delete require.cache[require.resolve(`./${args[0]}.js`)]
  message.reply(`The command ${args[0]} has been reloaded`)
}

exports.help = {
  name: 'reload',
  description: 'Reloads a command.',
  usage: 'reload <command>',
  fullDesc: 'Reloads a command. Must have a command specified.',
  type: 'dev',
  status: 2
}
