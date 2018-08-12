const Pokedex = require('pokedex-api')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  const dex = new Pokedex()
  
  if (typeof(args.join(' ')) == 'string') {
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
  } else if (typeof(parseInt(args.join(' '), 10)) == 'number') {
    dex.getPokemonByNumber(parseInt(args.join(' '), 10)).then(pokemon => {
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
  } else {
    msg.channel.send(':exclamation: | You must give me a Pokemon name or a Pokedex number to look up!')
  }
}

exports.help = {
  name: 'pokedex',
  description: 'Look for a Pokemon in the Pokedex.',
  usage: 'pokedex <pokemon|number>',
  fullDesc: 'Look for a Pokemon in the Pokedex.',
  type: 'fun'
}