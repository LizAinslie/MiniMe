const Pokedex = require('pokedex-api')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  const dex = new Pokedex()
  dex.getPokemonByName(encodeURIComponent(args.join(' '))).then(pokemon => {
    const embed = new Discord.RichEmbed()
    .setTitle(pokemon.name)
    .setThumbnail(pokemon.sprite)
    .setColor(client.config.color)
    .addField('Pokedex Number', pokemon.number, true)
    .addField('Mythical?', pokemon.mythical ? 'Yes' : 'No', true)
    .addField('Height', pokemon.height, true)
    .addField('Weight', pokemon.weight, true)
    msg.channel.send(embed)
  })
}

exports.help = {
  name: 'pokedex',
  description: 'Look for a Pokemon in the Pokedex.',
  usage: 'pokedex <pokemon>',
  fullDesc: 'Look for a Pokemon in the Pokedex.',
  type: 'fun'
}