/* eslint no-eval: 0 */
/* Eris Fixed */

const formatArbitrary = require('../util/formatArbitrary.js')
const uploadToHastebin = require('../util/uploadToHastebin.js')
const util = require('util')

exports.run = async (client, msg, args) => {
  if (msg.author.id !== client.config.ownerID) { return msg.channel.createMessage(':no_entry_sign: │ Only my developer can use this!') }
  try {
				let result = await eval(args.join(' '));
				if (typeof result !== 'string') result = util.inspect(result);
				result = formatArbitrary(client, result);
				if (result.length > 1992) {
					uploadToHastebin(result).then((url) => {
						msg.channel.createMessage(':outbox_tray:   **»**   ' + url);
					}).catch((error) => {
						msg.channel.createMessage(':exclamation:   **»**   Failed to upload result to hastebin. `' + error.message + '`');
					});
				} else {
					msg.channel.createMessage('```js\n' + result + '```');
				}
			} catch (e) {
				msg.channel.createMessage('```js\n' + e + '```');
			}
}

exports.help = {
  name: 'eval',
  description: 'Evaluates JavaScript.',
  usage: 'eval <code>',
  fullDesc: `Evaluates Javascript. Can only be used by my developer. :P`,
  type: 'dev',
  status: 2,
  aliases: ['ev']
}
