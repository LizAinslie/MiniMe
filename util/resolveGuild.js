module.exports = (bot, query) => {
	return new Promise((resolve, reject) => {
		if (/^\d+$/.test(query)) {
			const guild = bot.guilds.get(query);
			if (guild) return resolve(guild);
		} else {
			const guilds = bot.guilds.filter((guild) => guild.name.toLowerCase().includes(query.toLowerCase()));
			if (guilds.size > 0) return resolve(guilds.first());
		}
		reject(new Error('Invalid Guild!'));
	});
};