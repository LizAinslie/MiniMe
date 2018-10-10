const Logger = require('../util/Logger');
const resolveUser = require('../util/resolveUser.js')

exports.run = async (client, msg, args) => {
  let member = null
	if (!msg.member.permission.has('manageMessages')) return msg.channel.createMessage(':no_entry_sign: │ You do not have permission to run this command.');
	if (args.length < 1) return msg.channel.createMessage(':question: │ You must provide a clean amount.');
	if (args.length > 1) member = await resolveUser(client, args[1])
	if (isNaN(args[0])) return msg.channel.createMessage(':exclamation: │ The clean amount must be a valid number.');
	if (Number(args[0]) < 2) return msg.channel.createMessage(':exclamation: │ The clean amount must be greater than or equal to 2.');
	if (Number(args[0]) > 100) return msg.channel.createMessage(':exclamation: │ The clean amount must be less than or equal to 100.');
	msg.channel.getMessages(Number(args[0]), msg.id).then(messages => {
	  if (member) messages = messages.filter(msg => msg.author.id === member.id)
		Promise.all(messages.map(message => message.delete())).then(() => {
			msg.channel.createMessage(':white_check_mark: │ Successfully cleaned `' + messages.length + '` messages.').then(m => {
				setTimeout(() => {
					m.delete();
				}, 2000);
			});
		});
	}).catch((error) => {
		msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.');
		Logger.error(error);
	});
}

exports.help = {
  name: 'purge',
  description: 'Removes msgs in bulk.',
  usage: 'purge <number>',
  fullDesc: 'Removes msgs in bulk. Up to 100 msgs can be removed at once.',
  type: 'mod',
  status: 2,
  aliases: ['clean']
}
