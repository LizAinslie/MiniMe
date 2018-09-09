const responses = [
	'It is certain',
	'It is decidedly so',
	'Without a doubt',
	'Yes, definetly',
	'You may rely on it',
	'As I see it, yes',
	'Most likely',
	'Outlook good',
	'Yes',
	'Signs point to yes',
	'Reply hazy try again',
	'Ask again later',
	'Better not tell you now',
	'Cannot predict now',
	'Concentrate and ask again',
	'Don\'t count on it',
	'My reply is no',
	'My sources say no',
	'Outlook not so good',
	'Very doubtful'
]
exports.run = (client, message, args) => {
  if (args.length < 1) return message.channel.createMessage(':question: │ Missing `<question>` option.')
  if (!(args[args.length - 1].endsWith('?'))) return message.channel.createMessage(':question: │ Missing a `?`.')
  message.channel.createMessage(':crystal_ball: │ ' + responses[Math.floor(Math.random() * responses.length)])
}

exports.help = {
  name: '8ball',
  description: 'Get an accurate response from the magic 8-ball.',
  usage: '8ball <question>',
  fullDesc: 'Get an accurate response from the magic 8-ball. You must ask it a question first, though.',
  type: 'fun',
  status: 2
}
