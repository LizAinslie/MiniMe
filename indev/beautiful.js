const snekfetch = require('snekfetch')
const Canvas = require('canvas')
const config = require('../config.json')
const Discord = require('discord.js')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(args.join(' ')).then(user => {
    
  })
}