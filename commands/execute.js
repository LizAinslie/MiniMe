/* Eris Fixed */

const childProcess = require('child_process')
const uploadToHastebin = require('../util/uploadToHastebin.js')
const formatArbitrary = require('../util/formatArbitrary.js')

exports.run = (client, msg, args) => {
	if (msg.author.id !== client.config.ownerID) return msg.channel.createMessage(':no_entry_sign: │ You do not have permission to run this command.')
	childProcess.exec(args.join(' '), (error, stdout, stderr) => {
    if (error) { return console.error(error) }
		const result = formatArbitrary(client, stderr || stdout)
		if (result.length > 1992) {
			uploadToHastebin(result).then((url) => {
				msg.channel.createMessage(':outbox_tray: │ ' + url)
			}).catch((error) => {
				msg.channel.createMessage(':exclamation: │ Failed to upload result to hastebin. `' + error.message + '`')
			})
		} else {
			msg.channel.createMessage('```bash\n' + result + '```')
		}
	})
}

exports.help = {
  name: 'execute',
  description: 'Executes a bash command.',
  usage: 'execute <command>',
  fullDesc: 'Executes a bash command. Only RailRunner16 can use it. :P',
  type: 'dev',
  status: 2,
  aliases: ['exec']
}
