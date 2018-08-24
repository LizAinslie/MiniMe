const util = require('../util.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    util.resolveUser(client, args.join(' ')).then(user => {
      let key = `${user.id}-balance`
      let balance = client.userData.get(key)
      msg.reply(`${user.username}#${user.discriminator} has **<:coins:482589075459801098>` + balance.toString() + ' Minicoins** in their bank account.')
    })
  } else {
    let key = `${msg.author.id}-balance`
    let balance = client.userData.get(key)
    msg.reply('you have **<:coins:482589075459801098>' + balance.toString() + ' Minicoins** in your bank account.')
  }
}

exports.help = {
  name: 'balance',
  description: 'Check the amount of money in your bank account.',
  usage: 'balance [user]',
  fullDesc: 'Check the amount of money in you (or someone else\'s) bank account.',
  type: 'eco'
}
