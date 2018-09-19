/* Eris Fixed */

const resolveRole = require('../util/resolveRole.js')

exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.createMessage(':no_entry_sign: │ You need the permission `MANAGE_ROLES` to use this.')
  
  resolveRole(client, args.join(' '), msg.guild).then(role => {
    const roledUsers = msg.guild.members.array().filter(m => m.roles.some(r => [role.name].includes(r.name)))
    for (let member of roledUsers) {
      member.removeRole(role.id)
    }
    msg.channel.createMessage(`:white_check_mark: │ Removed the <@&${role.id}> role from ${roledUsers.length} members.`)
  })
}

exports.help = {
  name: 'massremoverole',
  description: 'Removes a role from many users.',
  usage: 'massremoverole <role>',
  fullDesc: 'Removes a role from many users.',
  type: 'mod',
  status: 2,
  aliases: []
}