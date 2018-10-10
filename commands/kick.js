const resolveMember = require('../util/resolveMember.js')

exports.run = async (client, msg, args) => {
  if (!msg.member.permission.has('kickMembers')) return msg.channel.createMessage(':no_entry_sign: │ You need the `Kick Members` permission in order to use this command.');
	if (!msg.channel.guild.members.get(client.user.id).permission.has('kickMembers')) return msg.channel.createMessage(':no_entry_sign: │ I need the `Kick Members` permission in order to complete this command.');
	if (args.length < 1) return msg.channel.createMessage(':question: │ You must provide a user to kick.');
		resolveMember(client, args[0], msg.channel.guild, true).then((member) => {
		member.kick(null, args.length > 1 ? args.slice(1).join(' ') : null).then(() => {
			client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
				if (settings && settings.doLogs && settings.logChannel && msg.channel.guild.channels.has(settings.logChannel) && msg.channel.guild.channels.get(settings.logChannel).permissionsOf(client.user.id).has('sendMessages')) {
					msg.channel.guild.channels.get(settings.logChannel).createMessage({
					  embed: {
					    title: 'User Kicked',
					    color: client.colors.RED,
					    thumbnail: {
					      url: msg.author.avatarURL
					    },
					    timestamp: new Date(),
					    fields: [
					      {
					        name: 'Guilty User',
					        value: `<@${member.id}> (${member.username}#${member.discriminator})`,
					        inline: true
					      },
					      {
					        name: 'Responsible Moderator',
					        value: `<@${msg.author.id}> (${msg.author.username}#${msg.author.discriminator})`,
					        inline: true
					      },
					      {
					        name: 'Reason',
					        value: args.length > 1 ? args.slice(1).join(' ') : 'No reason'
					      }
					    ]
					  }
					});
				} else {
					msg.channel.createMessage(':boot: │ Successfully kicked ' + member.username + '#' + member.discriminator + ' (' + member.id + ').');
				}
			});
		}).catch(() => {
			msg.channel.createMessage(':exclamation: │ Failed to kick ' + member.username + '#' + member.discriminator + '. Please note that I cannot kick members that have a higher role than mine.');
		});
	}).catch(() => {
		msg.channel.createMessage(':exclamation: │ Unable to find any users by that query.');
	});
}

exports.help = {
  name: 'kick',
  description: 'Kicks a user.',
  usage: 'kick <user> [reason]',
  fullDesc: 'Kicks a user.',
  type: 'mod',
  status: 2,
  aliases: []
}
