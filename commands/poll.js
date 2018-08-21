exports.run = (client, message, args, level) => {

  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('**Invalid Format:** `!poll <Question>`')
  
  message.channel.send({
    embed: {
      title: 'A Poll Has Been Started!',
      color: client.config.color,
      description: `${question}`,
      author: {
        name: `Poll Started By: ${message.author.username}#${message.author.discriminator}`,
        icon_url: message.author.displayAvatarURL
      },
      footer: {
        text: 'Status: 200',
        icon_url: client.user.avatarURL
      },
      timestamp: new Date()
    }
  })
  .then(() => message.react('👍'))
  .then(() => message.react('👎'))
  .then(() => message.react('🤷'))
  .catch(() => client.rollbar.error('[poll.js] Emoji failed to react.'));
}