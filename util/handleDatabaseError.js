const Logger = require('./Logger.js')

module.exports = (client, error, msg) => {
	Logger.error('Failed to query the database.', error);
	if (msg) msg.channel.createMessage(':exclamation:   **»**   Failed to run the command. This incident has been reported.');
};