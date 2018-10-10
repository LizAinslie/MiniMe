const Eris = require("eris-additions")(require("eris"))
const fs = require('fs')
// const music = require('./music.js')
const Enmap = require('enmap')
var Rollbar = require('rollbar')
// const Idiot = require('idiotic-api')
const rethinkdb = require('rethinkdbdash')
const dashboard = require('./addons/dashboard.js')

// Initialize the provider

process.on('unhandledRejection', console.error)

const config = require('./config.json')
const colors = require('./colors.json')
const client = new Eris(config.token)
client.config = config
client.colors = colors

const r = rethinkdb(config.rethinkdb)
client.r = r

client.rollbar = new Rollbar({
  accessToken: config.apis.rollbar,
  captureUncaught: true,
  captureUnhandledRejections: true
})

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
    console.log(`bound event: ${eventName}`)
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

client.commands = new Enmap()
client.aliases = new Enmap()
client.playlists = new Enmap()

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    console.log(`Attempting to load command ${commandName}`)
    client.commands.set(commandName, props)
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  })
})


client.connect()

dashboard(client)
console.log('loaded Dashboard extension')

client.editStatus('online', { name: 'to Dr. Evil laugh', type: 2 })
