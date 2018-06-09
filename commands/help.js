exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys())
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)
    message.channel.send(`= Command List =\n\n[Use ${client.config.prefix}help <commandname> for details]\n\n${client.commands.map(c => `${client.config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code: 'asciidoc'})
  } else {
    let command = params[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      message.channel.send(`= ${command.help.name} = \n${command.help.fullDesc}\nusage::${client.config.prefix + command.help.usage}`, {code: 'asciidoc'})
    }
  }
}

exports.help = {
  name: 'help',
  description: 'Have the bot list commands.',
  usage: 'help[ <command>]',
  fullDesc: 'Have the bot list commands. If you give it a certain command, it will give an extended description.'
}
