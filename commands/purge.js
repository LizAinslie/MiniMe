exports.run = async (client, msg, args) => {
  // This command removes all msgs from all users in the channel, up to 100.
  if (!client.guildSettings.has(msg.guild.id)) return msg.channel.send(':exclamation: │ You must set up your server first! Use the `setup` command to do this.')
  if (!msg.member.roles.some(r => [client.guildSettings.getProp(msg.guild.id, 'ownerRole'), client.guildSettings.getProp(msg.guild.id, 'modRole'), client.guildSettings.getProp(msg.guild.id, 'helperRole')].includes(r.name))) { return msg.reply(':no_entry_sign: │ Sorry, you don\'t have permissions to use this!') }
  // get the delete count, as an actual number.
  const user = msg.mentions.users.first();
  // Parse Amount
  const amount = !!parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[1]) : parseInt(msg.content.split(' ')[2])
  if (!amount) return msg.reply('Must specify an amount to delete!');
  if (!amount && !user) return msg.reply('Must specify a user and amount, or just an amount, of messages to purge!');
  // Fetch 100 msgs (will be filtered and lowered up to max amount requested)
  msg.channel.fetchMessages({
   limit: 100,
  }).then((messages) => {
   if (user) {
   const filterBy = user ? user.id : Client.user.id;
   messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
   }
   msg.channel.bulkDelete(messages).catch(error => client.rollbar.error(error.stack));
  });
}

exports.help = {
  name: 'purge',
  description: 'Removes msgs in bulk.',
  usage: 'purge <number>',
  fullDesc: 'Removes msgs in bulk. Up to 100 msgs can be removed at once.',
  type: 'mod',
  status: 2
}
