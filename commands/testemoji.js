  const emojis = [
  'streaming <:streaming:313956277132853248>'
]

exports.run = (client, msg) => {
	client.r.table('users').get(msg.author.id).run().then(user => {
		if (!user.developer) return msg.channel.createMessage(':no_entry_sign: │ Only my developer can use this!')
		for (let emoji of emojis) {
			msg.channel.createMessage(emoji)
		}
	})
}

exports.help = {
  name: 'testemoji',
  description: 'Tests emojis.',
  usage: 'testemoji',
  fullDesc: 'Tests emojis.',
  type: 'dev',
  status: 2,
  aliases: ['emojitest']
}
