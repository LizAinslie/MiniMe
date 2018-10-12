const resolveUser = require('../util/resolveUser.js')
const handleDatabaseError = require('../util/handleDatabaseError.js')

exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.channel.createMessage(':question: │ You must provide a user ID, user mention, or user name.');
	if (args.length < 2) return msg.channel.createMessage(':question: │ You must provide an amount to transfer.');
	if (isNaN(args[1])) return msg.channel.createMessage(':exclamation: │ The transfer amount must be a valid number.');
	if (Number(args[1]) < 1) return msg.channel.createMessage(':exclamation: │ The transfer amount must be greater than or equal to 1.');
	resolveUser(client, args[0]).then((user) => {
		client.r.table('balance').get(msg.author.id).run((error, balance) => {
			if (error) return handleDatabaseError(error, msg);
			if (!balance || Number(args[1]) > balance.amount) return msg.channel.createMessage(':exclamation: │ You cannot transfer more money than you have.');
			client.r.table('balance').get(msg.author.id).update({
				amount: balance.amount - Number(args[1])
			}).run((error) => {
				if (error) return handleDatabaseError(error, msg);
				client.r.table('balance').get(user.id).run((error, balance) => {
					if (error) return handleDatabaseError(error, msg);
					if (balance) {
						client.r.table('balance').get(user.id).update({
							amount: balance.amount + Number(args[1])
						}).run((error) => {
							if (error) return handleDatabaseError(error, msg);
							msg.channel.createMessage(':money_with_wings: │ Successfully sent $' + Number(args[1]).toLocaleString() + ' to `' + user.username + '#' + user.discriminator + '`.');
						});
					} else {
						client.r.table('balance').insert({
							id: user.id,
							amount: Number(args[1])
						}).run((error) => {
							if (error) return handleDatabaseError(error, msg);
							msg.channel.createMessage(':money_with_wings: │ Successfully sent $' + Number(args[1]).toLocaleString() + ' to `' + user.username + '#' + user.discriminator + '`.');
						});
					}
				});
			});
		});
	}).catch(() => {
		msg.channel.createMessage(':exclamation: │ Unable to find any users by that query.');
	});
}

exports.help = {
  name: 'pay',
  description: 'Send a user money.',
  usage: 'pay <user> <amount>',
  fullDesc: 'Send a user money.',
  type: 'eco',
  status: 2,
  aliases: ['send']
}