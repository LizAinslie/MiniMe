module.exports = (client, data) => {
	data = data.replace(new RegExp(client.config.token, 'g'), '-- SENSITIVE INFORMATION --')
	return data
}
