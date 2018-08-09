const snekfetch = require('snekfetch')
const config = require('../config.json')

exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.channel.send(':question: | You must provide a server IP address.');
  const host = args.join('').split(':')[0];
  const port = args.join('').split(':')[1] || '25565';
  if (isNaN(port)) return msg.channel.send(':exclamation: | The port must be a valid number.');
  if (Number(port) > 65536) return msg.channel.send(':exclamation: | The port must be less than or equal to 65536.');
  snekfetch.get('https://mcapi.us/server/status?ip=' + host + '&port=' + port).then((server) => {
    server = server.body;
    if (server.status === 'success') {
      const send = (favicon) => {
        const data = {
          title: host + ':' + port,
          description: server.motd.replace(/[ ]{2,}/g, ' '),
          color: config.color,
          fields: [
            {
              name: 'Players',
              value: server.players.now + '/' + server.players.max,
              inline: true
            },
            {
              name: 'Version',
              value: server.server.name,
              inline: true
            }
          ]
        };
        if (favicon) data.thumbnail = { url: favicon };
        msg.channel.send({
          embed: data
        });
      };
      send()
    } else {
      msg.channel.send(':exclamation: | Unable to ping any servers by that IP address.');
    }
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'mcserver',
  description: 'Gets Minecraft server info.',
  usage: 'mcserver <ip>',
  fullDesc: 'Gets Minecraft server info. Must provide a server IP.',
  type: 'util'
}