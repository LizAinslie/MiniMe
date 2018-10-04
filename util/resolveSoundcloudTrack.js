var scid = require('soundcloud-id')

module.exports = (client, pageUrl) => {
  return new Promise((resolve, reject) => {
    scid(pageUrl, (err, id) => {
      if (err) return reject(err)
      return resolve(`https://media.soundcloud.com/stream/${id}.mp3`)
    })
  })
}
