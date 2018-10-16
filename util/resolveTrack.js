const snekfetch = require('snekfetch')
const config = require('../config.json')

module.exports = query => {
	return new Promise((resolve, reject) => {
		snekfetch.get(`http://${config.lavalink.nodes[0].host}:${config.lavalink.nodes[0].port}/loadtracks?identifier=${query}`).set('Authorization', config.lavalink.nodes[0].password).then(result => {
			console.log(result.body)
			console.log(result.body.tracks[0].info)
			resolve(result.body)
		}).catch(error => reject(error))
	})
}
