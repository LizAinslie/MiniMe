const snekfetch = require('snekfetch')

module.exports = (client) => {
  client.on('ready', () => {
    setInterval(() => {
      snekfetch.post(`https://botsfordiscord.com/api/bots/${client.user.id}/stats`)
        .set('Authorization', client.config.apis.botlists.dbl)
        .send({
          server_count: client.guilds.size
        }).then(() => console.log('Updated discordbots.org stats.'))
        .catch(err => client.rollbar.error(`Discordbots.org server count update failed : ${err.body}`));
    }, 1800000);
  })
}