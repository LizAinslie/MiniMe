exports.run = (client, msg) => {
    client.r.table('users').get(msg.author.id).run().then(user => {
        if (!user.developer) return msg.channel.createMessage(':no_entry_sign: │ Only my developer can use this command!')
        client.rollbar.log('Testing Rollbar from Discord')
    })
}

exports.help = {
  name: 'testrollbar',
  description: 'Tests Rollbar.',
  usage: 'testrollbar',
  fullDesc: 'Tests Mini Me\'s Rollbar integration.',
  type: 'dev',
  status: 2,
  aliases: []
}
