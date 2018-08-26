const request = require('snekfetch')
const HTMLParser = require('fast-html-parser')

exports.run = async (client, msg) => {
    const { body: html } = await request.get('http://www.fmylife.com/random')
    const root = HTMLParser.parse(html)
    const article = root.querySelector('.block a')
    return msg.channel.send(article.text)
}

exports.help = {
  name: 'fml',
  description: 'Gets a random FML quote.',
  usage: 'fml',
  fullDesc: 'Gets a random FML quote.',
  type: 'fun',
  status: 1
}
