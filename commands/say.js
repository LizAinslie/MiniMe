/* Eris Fixed */

exports.run = (client, msg, args) => {
	client.r.table('users').get(msg.author.id).run().then(user => {
  		if (!user.developer) return msg.channel.createMessage(':no_entry_sign: │ You are not my developer!')
  		msg.channel.createMessage(args.join(' '))
	})
}

exports.help = {
  name: 'say',
  description: 'Says the specified text.',
  usage: 'say <text>',
  fullDesc: 'Says the specified text.',
  type: 'dev',
  status: 2,
  aliases: []
}
