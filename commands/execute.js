const childProcess = require('child_process')
const util = require('../util.js')

exports.run = (client, msg, args) => {
	if (msg.author.id !== client.config.ownerID) return msg.channel.send(':no_entry_sign: │ You do not have permission to run this command.')
	childProcess.exec(args.join(' '), (error, stdout, stderr) => {
    if (error) { return console.error(error) }
		const result = util.formatArbitrary(stderr || stdout)
		if (result.length > 1992) {
			util.uploadToHastebin(result).then((url) => {
				msg.channel.send(':outbox_tray: │ ' + url)
			}).catch((error) => {
				msg.channel.send(':exclamation: │ Failed to upload result to hastebin. `' + error.message + '`')
			})
		} else {
			msg.channel.send('```bash\n' + result + '```')
		}
	})
}

exports.help = {
  name: 'execute',
  description: 'Executes a bash command.',
  usage: 'execute <command>',
  fullDesc: 'Executes a bash command. Only RailRunner16 can use it. :P',
  type: 'dev'
}
