const dashboard = require('../addons/dashboard.js')

module.exports = (client, id) => {
  // console.log(`Ready to run in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`)
  client.edidStatus('online', { name: 'to Dr. Evil laugh', type: 2 })

  /*
   *
   * Extensions
   *
   */

  dashboard(client)
  console.log('loaded Dashboard extension')
}
