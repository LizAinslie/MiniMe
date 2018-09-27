const resolveMember = require('../util/resolveMember.js')
const resolveRole = require('../util/resolveRole.js')

exports.run = async (client, msg, args) => {
    const member = await resolveMember(client, args.shift(), msg.channel.guild)
    resolveRole(client, args.join(" "), msg.channel.guild).then(role => {
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
    usage: 'giverole <member> <role[ role...]>',
    fullDesc: 'Gives a user one or more roles.',
    type: 'mod',
    status: 2,
    aliases: []
}