const resolveMember = require('../util/resolveMember.js')
const resolveRole = require('../util/resolveRole.js')

exports.run = async (client, msg, args) => {
    args = args.split('|').trim()
    const member = await resolveMember(client, args[0], msg.channel.guild, true)
    resolveRole(client, args[1], msg.channel.guild).then(role => {
        member.addRole(role.id).then(() => {
            msg.chennel.createMessage(`Gave <@${member.id}> the role \`${role.name}\``)
        }).catch(err => {
            client.rollbar.error('could not add role: ' + err)
        })
    }).catch(err => {
        client.rollbar.error('could not add role: ' + err)
    })
}

exports.help = {
    name: 'giverole',
    description: 'Gives a user one or more roles.',
    usage: 'giverole <member> | <role>',
    fullDesc: 'Gives a user one or more roles.',
    type: 'mod',
    status: 2,
    aliases: ['addrole']
}
