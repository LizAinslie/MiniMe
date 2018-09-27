const resolveMember = require('../util/resolveMember.js')
const resolveRole = require('../util/resolveRole.js')

exports.run = async (client, msg, args) => {
    const member = await resolveMember(client, args.shift(), msg.channel.guild)
    let rolesToAdd = []
    for (let role of args) {
        resolveRole(client, role, msg.channel.guild).then(role => {
            member.addRole(role.id)
        })
    }
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