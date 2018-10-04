const snekfetch = require('snekfetch')
const dateformat = require('dateformat')
const formatSize = require('./formatSize.js')

module.exports = message => {
	return new Promise((resolve, reject) => {
		snekfetch.post('https://h.railrunner16.me/documents').send('// ' + dateformat(Date.now(), 'mm/dd/yyyy hh:MM:ss TT') + '\n// ' + message.length + ' characters\n// ' + formatSize(message.length) + '\n\n' + message).then((result) => {
			resolve('https://h.railrunner16.me/' + result.body.key + '.js')
		}).catch((error) => {
			reject(error)
		})
	})
}
