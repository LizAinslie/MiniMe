module.exports = (client, data) => {
	data = data.replace(new RegExp(client.config.token, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.dashboard.secret, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.dashboard.sessionSecret, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.botlists.bls, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.botlists.dbl, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.botlists.dbg, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.botlists.dbw, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.botlists.dblcom, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.botlists.dbtk, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.triggered, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.idiot, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.yt, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.rollbar, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.openweathermap, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.fortnite, 'g'), '-- SENSITIVE INFORMATION --')
	data = data.replace(new RegExp(client.config.apis.giphy, 'g'), '-- SENSITIVE INFORMATION --')
	return data
}
