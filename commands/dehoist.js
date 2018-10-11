exports.run = (client, msg) => {
    let members = 0;
    msg.channel.guild.members.forEach(member => {
        if (member.nick) {
            member.edit({ nick: member.nick.replace(/^(!|:|'|{|}|\?|\.|;|:|"|\*|\/)+/g, '') })
            members += 1
        }
    })
    msg.channel.createMessage(`:white_check_mark: │ **${members}** Member${members === 1 ? '' : 's'} Dehoisted!`)
}

exports.help = {
    name: 'dehoist',
    description: 'Dehoist all hoisted users.',
    usage: 'dehoist',
    fullDesc: 'Dehoist all hoisted users.',
    type: 'mod',
    status: 2,
    aliases: ['unhoist']
}