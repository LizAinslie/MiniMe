const Discord = require('discord.js')
const fs = require('fs')
// const music = require('./music.js')
const Enmap = require('enmap')
const EnmapSql = require('enmap-sqlite')
// Initialize the provider

const client = new Discord.Client()
const config = require('./config.json')
client.config = config

client.railEmoji = client.emojis.find('name', 'rail')

client.points = new Enmap({provider: new EnmapSql({ name: 'points' })})

client.guildSettings = new Enmap({provider: new EnmapSql({ name: 'settings' })})

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
  })
})

client.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    console.log(`Attempting to load command ${commandName}`)
    client.commands.set(commandName, props)
  })
})

// music(client, { commandPrefix: 'm!', global: false, maxQueueSize: 10, clearInvoker: true, channel: 'Music' })
client.login(process.env.DISCORD_TOKEN)
