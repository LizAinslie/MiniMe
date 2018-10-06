exports.run = (client, msg) => {
    msg.channel.guild.members.forEach(member => {
        member.edit({ nick: member.displayName.replace(/^(!|:|'|{|}|\?|\.|;|:|"|\*|\/)+/g, '') })
        msg.channel.createMessage(':white_check_mark: │ Members Dehoisted!')
    })
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