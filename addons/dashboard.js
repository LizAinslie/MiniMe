/* eslint-disable no-unused-vars */

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-discord');
const config = require('../config.json');

const moment = require('moment')
require('moment-duration-format')

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../dashboard/templates`);

module.exports = client => {
	const authenticate = (admin = false) => {
		return async (req, res, next) => {
			if (!req.isAuthenticated()) return res.redirect('/login');

			if (admin) {
				const user = await client.r.table('users').get(req.user.id);
				if (!user) return res.sendStatus(401);
				if (!user.developer) return res.sendStatus(401);
			}

			next();
		};
	};

	app.use(session({
		secret: client.config.dashboard.sessionSecret
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(async (profile, cb) => {
		const avatarUrl = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}${profile.avatar.startsWith('a_') ? '.gif' : '.png'}` : `https://cdn.discordapp.com/embed/avatars/${profile.discriminator % 5}.png`;

		const availableServers = profile.guilds.filter(g => g.owner || (g.permissions & 8) === 8 || (g.permissions & 32) === 32).map(g => {
			const serverIcon = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png` : g.name.replace(/\w+/g, w => w[0]).replace(/\s/g, '');

			return {
				id: g.id,
				name: g.name,
				icon: serverIcon,
				owner: g.owner,
				permissions: g.permissions
			};
		});

		const user = {
			id: profile.id,
			accessToken: profile.accessToken,
			username: profile.username,
			discriminator: profile.discriminator,
			tag: `${profile.username}#${profile.discriminator}`,
			avatar: avatarUrl,
			servers: availableServers
		};

		const existingUser = await client.r.table('oauth').get(user.id);

		if (existingUser) await client.r.table('oauth').get(user.id).update(user);
		else await client.r.table('oauth').insert(user);

		cb(null, user.id)
	});

	passport.deserializeUser(async (id, cb) => {
		const user = await client.r.table('oauth').get(id);

		cb(null, user);
	});

	passport.use(new Strategy({
		clientID: config.info.id,
		clientSecret: config.dashboard.secret,
		callbackURL: config.dashboard.callback,
		scope: ['identify', 'guilds']
	}, (aT, rT, profile, cb) => cb(undefined, profile)));

	app.use('static', express.static(`${__dirname}/../dashboard/static`));

	// Views

	app.get('/', (req, res) => {
		res.render('index.ejs', {  bot: client, user: req.user ? client.users.get(req.user.id) : null, path: req.url });
	});

	app.get('/commands', (req, res) => {
		res.render('commands.ejs', { cmds: client.commands });
	});

	app.get('/stats', (req, res) => {
		res.render('stats.ejs', { 
			user: client.user, 
			bot: client, 
			path: req.url, 
			nVersion: process.version, 
			channels: client.channels.size, 
			servers: client.guilds.size, 
			uptime: moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]'), 
			memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
			members: client.users.size
		});
	});

	app.get('/admin', authenticate(true), (req, res) => {
		res.render('admin.ejs');
	});
	
	app.get('/user/:id', async (req, res) => {
		let userProfile = await client.r.table('users').get(req.params.id);
		let balance = await client.r.table('balance').get(req.params.id)

		if (!userProfile) {
			userProfile = {
				id: req.params.id,
				description: 'This user prefers to keep their autobiography a mystery.',
				developer: false,
				itemPick: 0,
				itemRing: 0,
				marriedTo: null
			};
		}

		res.render('viewUser.ejs', {  bot: client, user: client.users.get(req.params.id), profile: userProfile, path: req.url, balance: balance });
	})

	app.get('/me', authenticate(), (req, res) => res.redirect(`/manage/user/${req.user.id}`));
	
	app.get('/manage/user/:id', authenticate(), async (req, res, next) => {
		if(req.params.id != req.user.id) return res.sendStatus(403)
		let description = req.query.description;
		let balance = await client.r.table('balance').get(req.params.id)
		
		if (!description) return next();

		if (description.length > 250) description = `${description.slice(0, 247)}...`;

		client.r.table('users').get(req.params.id).run().then(user => {
			if (user) {
				client.r.table('users').get(user.id).update({
					description: description
				}).run().then(user => {
					next();
				}).catch(err  => {
					client.rollbar.error(err)
					res.sendStatus(500)
				})
			} else {
				client.r.table('users').get(user.id).insert({
					id: req.user.id,
					description: description,
					developer: false,
					itemPick: 0,
					itemRing: 0,
					marriedTo: null
				}).run().then(user => {
					next();
				}).catch(err  => {
					client.rollbar.error(err)
					res.sendStatus(500)
				})
			}
		})
	})

	app.get('/manage/user/:id', authenticate(), async (req, res) => {
		if(req.params.id != req.user.id) return res.sendStatus(403)
		let userProfile = await client.r.table('users').get(req.params.id);
		let balance = await client.r.table('balance').get(req.params.id)

		if (!userProfile) {
			userProfile = {
				id: req.user.id,
				description: 'This user prefers to keep their autobiography a mystery.',
				developer: false,
				itemPick: 0,
				itemRing: 0,
				marriedTo: null
			};
		}

		res.render('user.ejs', {  bot: client, user: client.users.get(req.user.id), profile: userProfile, path: req.url, balance: balance });
	});

	app.get('/manage/server/:id', authenticate(), (req, res) => {
		res.render('server.ejs');
	});

	// OAuth

	app.get('/login', passport.authenticate('discord'));

	app.get('/callback', passport.authenticate('discord'), (req, res) => {
		res.redirect(`/manage/user/${req.user.id}`);
	});
};

app.listen(3100);
