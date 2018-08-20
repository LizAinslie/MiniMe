const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.channel.send(':question:	׀ You must provide a username.');
  snekfetch.post('https://api.mojang.com/profiles/minecraft').send([ args[0] ]).then((result) => {
    if (result.body.length < 1) return msg.channel.send(':exclamation:	׀ Unable to find any players by that username.');
    snekfetch.get('https://api.mojang.com/user/profiles/' + result.body[0].id + '/names').then((names) => {
      if (names.body.length < 2) return msg.channel.send(':exclamation:	׀ `' + result.body[0].name + '` has had no previous usernames.');
      msg.channel.send(':clipboard:	׀ `' + result.body[0].name + '` has had the following names: `' + names.body.map((name) => name.name).join(' → ') + '`');
    }).catch((error) => {
      msg.channel.send(':exclamation:	׀ Failed to run the command.');
    });
  }).catch((error) => {
    msg.channel.send(':exclamation:	׀ Failed to run the command.');
  });
}

exports.help = {
  name: 'mcoldnames',
  description: 'Grabs the old names of a Minecraft user.',
  usage: 'mcoldnames <username>',
  fullDesc: 'Grabs the old names of a Minecraft user.',
  type: 'util'
}