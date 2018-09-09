const Pokedex = require('pokedex-api')
const Discord = require('discord.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  const dex = new Pokedex()
  dex.getPokemonByName(encodeURIComponent(args.join(' '))).then(pokemon => {
    const embed = new Discord.RichEmbed()
    .setTitle(pokemon.name)
    .setThumbnail(pokemon.sprite)
    .setColor(getEmbedColor(msg))
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
  type: 'fun',
  status: 0
}
