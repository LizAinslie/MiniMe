exports.run = (client, msg, args) => {
    if (!args[0]) return msg.channel.createMessage('You must tell me what you want me to clap!')
    msg.channel.createMessage(args.join(' :clap: ').replace('@everyone', '@​everyone').replace('@here', '@​here') + ' :clap:')
}

exports.help = {
    name: 'clap',
    description: 'Make the bot clap your message.',
    usage: 'clap <message>',
    fullDesc: 'Make the bot clap your message.',
    type: 'fun',
    status: 2,
    aliases: []
}
