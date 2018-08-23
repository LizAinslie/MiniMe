const util = require('../util.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    util.resolveUser(client, args.join(' '), false, true).then(user => {

    })
  }
}
