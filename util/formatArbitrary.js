module.exports = (client, data) => {
	data = data.replace(new RegExp(client.config.token, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.dashboard.secret, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.dashboard.sessionSecret, 'g'), '-- SENSITIVE INFORMATION --')
	return data
}
