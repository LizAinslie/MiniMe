const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const stripTrailingZero = require('../util/stripTrailingZero.js')

exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.channel.send(':question: │ You must provide a location.')
  snekfetch.get('https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(args.join(' ')) + '&APPID=' + client.config.apis.openweathermap).then((result) => {
    msg.channel.send({
      embed: {
        title: 'Weather',
        color: getEmbedColor(msg),
        fields: [
          {
            name: 'Location',
            value: result.body.name + ', ' + result.body.sys.country,
            inline: true
          },
          {
            name: 'Temperature',
            value: stripTrailingZero((result.body.main.temp * (9 / 5)) - 459.67) + ' °F / ' + stripTrailingZero(result.body.main.temp - 273.15) + ' °C',
            inline: true
          },
          {
            name: 'Min. Temperature',
            value: stripTrailingZero((result.body.main.temp_min * (9 / 5)) - 459.67) + ' °F / ' + stripTrailingZero(result.body.main.temp_min - 273.15) + ' °C',
            inline: true
          },
          {
            name: 'Max. Temperature',
            value: stripTrailingZero((result.body.main.temp_max * (9 / 5)) - 459.67) + ' °F / ' + stripTrailingZero(result.body.main.temp_max - 273.15) + ' °C',
            inline: true
          },
          {
            name: 'Pressure',
            value: stripTrailingZero(0.014 * result.body.main.pressure) + ' psi',
            inline: true
          },
          {
            name: 'Humidity',
            value: result.body.main.humidity + '%',
            inline: true
          },
          {
            name: 'Visibility',
            value: stripTrailingZero(result.body.visibility * 0.00062) + ' mi / ' + stripTrailingZero(result.body.visibility / 1000) + ' km',
            inline: true
          },
          {
            name: 'Wind',
            value: stripTrailingZero(result.body.wind.speed * (25 / 11)) + ' mph / ' + stripTrailingZero(result.body.wind.speed * 3.6) + ' km/h',
            inline: true
          },
          {
            name: 'Cloudiness',
            value: result.body.clouds.all + '%',
            inline: true
          }
        ],
        footer: {
          text: 'Information provided via Open Weather Map'
        }
      }
    })
  }).catch((error) => {
    if (error.statusCode === 404) return msg.channel.send(':exclamation: │ Unable to find any locations by that name.')
    msg.channel.send(':exclamation: │ Failed to run the command.')
  })
}

exports.help = {
  name: 'weather',
  description: 'Gets you weather information.',
  usage: 'weather <location>',
  fullDesc: 'Gets you weather information. You must provide a location.',
  type: 'util',
  status: 2
}
