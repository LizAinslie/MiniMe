const resolveMember = require('../util/resolveMember.js')

exports.run = async (client, msg, args) => {
  if (!msg.member.permission.has('banMembers')) return msg.channel.createMessage('You don\'t have the proper permissions to do this! You need `BAN_MEMBERS`')
	if (!msg.channel.guild.members.get(client.user.id).permission.has('banMembers')) return msg.channel.createMessage('I need the permission `BAN_MEMBERS` to do this!')
	if (args.length < 1) return msg.channel.createMessage('You must mention someone to ban!')
	resolveMember(client, args[0], msg.channel.guild, true).then((member) => {
		member.ban(null, args.length > 1 ? args.slice(1).join(' ') : null).then(() => {
			client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
				if (settings && settings.doLogs && settings.logChannel && msg.channel.guild.channels.has(settings.logChannel) && msg.channel.guild.channels.get(settings.logChannel).permissionsOf(client.user.id).has('sendMessages')) {
					msg.channel.guild.channels.get(settings.logChannel).createMessage({
					  embed: {
					  	title: 'User Banned',
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
					})
					msg.channel.createMessage(`:hammer: │ Banned <@${member.id}> for: \`${args.length > 1 ? args.slice(1).join(' ') : 'No reason'}\``)
				} else {
					msg.channel.createMessage(`:hammer: │ Banned <@${member.id}> for: \`${args.length > 1 ? args.slice(1).join(' ') : 'No reason'}\``)
				}
			})
		}).catch(() => {
			msg.channel.createMessage('Unable to ban! This has been reported!')
		})
	}).catch(() => {
		msg.channel.createMessage('Unable to find that user!')
	})
}

exports.help = {
  name: 'ban',
  description: 'Bans a user.',
  usage: 'ban <user> [reason]',
  fullDesc: 'Bans a user.',
  type: 'mod',
  status: 2,
  aliases: ['bean']
}
