const Discord = require('discord.js')
const fs = require('fs')
// const music = require('./music.js')
const Enmap = require('enmap')
const EnmapSql = require('enmap-sqlite')
var Rollbar = require("rollbar");
//const Idiot = require('idiotic-api')
const music = require('./addons/music.js')

// Initialize the provider

process.on('unhandledRejection', console.error);

const client = new Discord.Client()
const config = require('./config.json')
client.config = config

client.railEmoji = client.emojis.find('name', 'rail')
//client.idiot = new Idiot.Client(config.apis.idiot, { dev: true })
//client.points = new Enmap({provider: new EnmapSql({ name: 'points' })})

client.guildSettings = new Enmap({provider: new EnmapSql({ name: 'settings', dataDir: './settings' })})

client.rollbar = new Rollbar({
  accessToken: config.apis.rollbar,
  captureUncaught: true,
  captureUnhandledRejections: true
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
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

music(client, { prefix: 'm::' })

client.login(config.token)
