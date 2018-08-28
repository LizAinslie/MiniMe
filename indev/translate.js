const translate = require('google-translate-api')

exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.channel.send(':question: │ You must provide a language code to translate to (e.g. `en` for English).')
	if (args.length < 2) return msg.channel.send(':question: │ You must provide text to translate.')
	translate(args.slice(1).join(' '), { to: args[0] }).then((result) => {
		msg.channel.send(':scroll: │ ' + result.text)
	}).catch((error) => {
		msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error(`[translate.js] translate error: ${error}`)
	})
}

exports.help = {
  name: 'translate',
  description: 'Translates text.',
  usage: 'translate <locale> <text>',
  fullDesc: 'Translates text to the specified locale.',
  type: 'util',
  status: 2
}
