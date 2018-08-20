const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  if (args.length > 0) {
    if (isNaN(args[0])) return msg.channel.send(':exclamation:	׀ The comic number must be a valid number.');
    if (Number(args[0]) < 1) return msg.channel.send(':exclamation:	׀ The comic number must be greater than or equal to 1.');
    snekfetch.get('https://xkcd.com/info.0.json').then((result) => {
      const max = result.body.num;
      if (Number(args[0]) > max) return msg.channel.send(':exclamation:	׀ The comic number must be less than or equal to ' + max.toLocaleString() + '.');
      snekfetch.get('https://xkcd.com/' + Number(args[0]) + '/info.0.json').then((result) => {
        msg.channel.send({
          embed: {
            title: result.body.safe_title,
            description: result.body.alt,
            color: client.config.color,
            image: {
              url: result.body.img
            }
          }
        });
      }).catch((error) => {
        msg.channel.send(':exclamation:	׀ Failed to run the command.');
      });
    }).catch((error) => {
      msg.channel.send(':exclamation:	׀ Failed to run the command.');
    });
  } else {
    snekfetch.get('https://xkcd.com/info.0.json').then((result) => {
      const random = Math.floor(Math.random() * result.body.num) + 1;
      snekfetch.get('https://xkcd.com/' + random + '/info.0.json').then((result) => {
        msg.channel.send({
          embed: {
            title: result.body.safe_title,
            description: result.body.alt,
            color: client.config.color,
            image: {
              url: result.body.img
            }
          }
        });
      }).catch((error) => {
        msg.channel.send(':exclamation:	׀ Failed to run the command.');
      });
    }).catch((error) => {
      msg.channel.send(':exclamation:	׀ Failed to run the command.');
    });
  }
}

exports.help = {
  name: 'xkcd',
  description: 'Fetches a random XKCD comic.',
  usage: 'xkcd [number]',
  fullDesc: 'Fetches a random XKCD comic, or the specified comic by number.',
  type: 'fun'
}