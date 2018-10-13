/* eslint-disable no-unused-vars */

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const RethinkSession = require('session-rethinkdb')(session)
const { Strategy } = require('passport-discord')
const config = require('../config.json')
const execute = require('child_process')

const moment = require('moment')
require('moment-duration-format')

const app = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/../dashboard/templates`)

module.exports = client => {
	const authenticate = (admin = false) => {
		return async (req, res, next) => {
			if (!req.isAuthenticated()) return res.redirect('/login')

			if (admin) {
				const user = await client.r.table('users').get(req.user.id)
				if (!user) return res.sendStatus(401)
				if (!user.developer) return res.sendStatus(401)
			}

			next()
		}
	}

	const rethinkStore = new RethinkSession(client.r)

	app.use(session({
		secret: client.config.dashboard.sessionSecret,
		store: rethinkStore
	}))

	app.use(passport.initialize())
	app.use(passport.session())

	passport.serializeUser(async (profile, cb) => {
		const avatarUrl = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}${profile.avatar.startsWith('a_') ? '.gif' : '.png'}` : `https://cdn.discordapp.com/embed/avatars/${profile.discriminator % 5}.png`

		const availableServers = profile.guilds.filter(g => g.owner || (g.permissions & 8) === 8 || (g.permissions & 32) === 32).map(g => {
			const serverIcon = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png` : g.name.replace(/\w+/g, w => w[0]).replace(/\s/g, '')

			return {
				id: g.id,
				name: g.name,
				icon: serverIcon,
				owner: g.owner,
				permissions: g.permissions
			}
		})

		const user = {
			id: profile.id,
			accessToken: profile.accessToken,
			username: profile.username,
			discriminator: profile.discriminator,
			tag: `${profile.username}#${profile.discriminator}`,
			avatar: avatarUrl,
			servers: availableServers
		}

		const existingUser = await client.r.table('oauth').get(user.id)

		if (existingUser) await client.r.table('oauth').get(user.id).update(user)
		else await client.r.table('oauth').insert(user)

		cb(null, user.id)
	})

	passport.deserializeUser(async (id, cb) => {
		const user = await client.r.table('oauth').get(id)

		cb(null, user)
	})

	passport.use(new Strategy({
		clientID: config.info.id,
		clientSecret: config.dashboard.secret,
		callbackURL: config.dashboard.callback,
		scope: ['identify', 'guilds']
	}, (aT, rT, profile, cb) => cb(undefined, profile)))

	app.use('static', express.static(`${__dirname}/../dashboard/static`))

	// Views

	app.get('/', (req, res) => {
		res.render('index.ejs', { bot: client, user: req.user ? client.users.get(req.user.id) : null, path: req.url })
	})

	app.get('/commands', (req, res) => {
		res.render('commands.ejs', { bot: client, user: req.user, path: req.url, cmds: client.commands })
	})

	app.get('/team', (req, res) => {
		res.render('team.ejs', { bot: client, user: req.user, path: req.url })
	})

	app.get('/command/:command', (req, res) => {
		const { command } = req.params
		if (!client.commands.has(command)) return res.sendStatus(404)

		res.render('command.ejs', { bot: client, path: req.url, user: req.user, command: client.commands.get(command) })
	})

	app.get('/stats', (req, res) => {
		res.render('stats.ejs', {
			user: client.user,
			bot: client,
			path: req.url,
			nVersion: process.version,
			servers: client.guilds.size,
			uptime: moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]'),
			memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
			members: client.users.size
		})
	})

	app.get('/admin', authenticate(true), (req, res, next) => {
		if (!req.query.update) return next()

		res.render('admin.ejs', { bot: client, user: req.user, path: req.url, updated: true })

		execute.exec('git pull', (error, stdout, stderr) => {
			if (error) { return console.error(error) }
			console.log(stdout || stderr)
			process.exit()
		})
	})

	app.get('/admin', authenticate(true), (req, res) => {
		res.render('admin.ejs', { bot: client, user: req.user, path: req.url, updated: false })
	})

	app.get('/user/:id', async (req, res) => {
		let userProfile = await client.r.table('users').get(req.params.id)
		let balance = await client.r.table('balance').get(req.params.id)

		if (!userProfile) {
			userProfile = {
				id: req.params.id,
				description: 'This user prefers to keep their autobiography a mystery.',
				developer: false,
				itemPick: 0,
				itemRing: 0,
				marriedTo: null
			}
		}

		res.render('viewUser.ejs', { bot: client, user: client.users.get(req.params.id), profile: userProfile, path: req.url, balance: balance })
	})

	app.get('/me', authenticate(), async (req, res, next) => {
		let description = req.query.description
		let balance = await client.r.table('balance').get(req.user.id)

		if (!description) return next()
		if (description.length > 250) description = `${description.slice(0, 247)}...`

		client.r.table('users').get(req.user.id).run().then(user => {
			if (user) {
				client.r.table('users').get(user.id).update({
					description: description
				}).run().then(user => {
					next()
				}).catch(err => {
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
					next()
				}).catch(err => {
					client.rollbar.error(err)
					res.sendStatus(500)
				})
			}
		})
	})

	app.get('/me', authenticate(), async (req, res) => {
		let userProfile = await client.r.table('users').get(req.user.id)
		let balance = await client.r.table('balance').get(req.user.id)

		if (!userProfile) {
			userProfile = {
				id: req.user.id,
				description: 'This user prefers to keep their autobiography a mystery.',
				developer: false,
				itemPick: 0,
				itemRing: 0,
				marriedTo: null
			}
		}

		res.render('user.ejs', { bot: client, user: client.users.get(req.user.id), profile: userProfile, path: req.url, balance: balance })
	})

	app.get('/dashboard', authenticate(), (req, res) => {
		res.render('dashboard.ejs', { bot: client, path: req.url, user: req.user })
	})

	app.get('/serverAdd', (req, res) => {
		const id = req.query.guild_id
		if (!id) return res.sendStatus(400)

		res.redirect(`/manage/server/${id}`)
	})

	app.get('/manage/server/:id', authenticate(), async (req, res, next) => {
		if (!req.user.servers.find(s => s.id === req.params.id)) return res.sendStatus(401)

		const server = client.guilds.get(req.params.id)
		if (!server) return res.redirect(`https://discordapp.com/oauth2/authorize?scope=bot&permissions=0&client_id=${client.user.id}&guild_id=${req.params.id}&response_type=code&redirect_uri=${encodeURIComponent(`https://${config.dashboard.domain}/serverAdd`)}`)
		next()
	})

	app.get('/manage/server/:id', async (req, res, next) => {
		const server = client.guilds.get(req.params.id)

		const dbEntry = await client.r.table('serverSettings').get(server.id)

		const defaults = dbEntry || {
			id: server.id,
			doLogs: false,
			doWelcomes: false,
			logChannel: null,
			muteRole: null,
			welcomeChannel: null,
			autoRole: null,
			doAutoRole: false
		}

		const newData = {}

		const isBool = v => ['true', 'false'].indexOf(v) !== -1
		const serverHas = (value, type) => value === 'null' || type.has(value)

		if (isBool(req.query.doLogs)) newData.doLogs = JSON.parse(req.query.doLogs)
		if (isBool(req.query.doAutoRole)) newData.doAutoRole = JSON.parse(req.query.doAutoRole)
		if (isBool(req.query.doWelcomes)) newData.doWelcomes = JSON.parse(req.query.doWelcomes)

		if (serverHas(req.query.logChannel, server.channels)) newData.logChannel = req.query.logChannel === 'null' ? null : req.query.logChannel
		if (serverHas(req.query.muteRole, server.roles)) newData.muteRole = req.query.muteRole === 'null' ? null : req.query.muteRole
		if (serverHas(req.query.autoRole, server.roles)) newData.autoRole = req.query.autoRole === 'null' ? null : req.query.autoRole
		if (serverHas(req.query.welcomeChannel, server.channels)) newData.welcomeChannel = req.query.welcomeChannel === 'null' ? null : req.query.welcomeChannel

		const serverData = Object.assign(defaults, newData)

		if (!dbEntry) await client.r.table('serverSettings').insert(serverData)
		else await client.r.table('serverSettings').update(serverData)

		next()
	})

	app.get('/manage/server/:id', async (req, res) => {
		const server = client.guilds.get(req.params.id)
		let settings = await client.r.table('serverSettings').get(server.id)

		if (!settings) {
			settings = {
				id: server.id,
				logChannel: null,
				welcomeChannel: null,
				muteRole: null,
				doWelcomes: true,
				doLogs: true,
				autoRole: null,
				doAutoRole: false
			}
		}

		res.render('server.ejs', { bot: client, path: req.url, user: req.user, guild: server, settings: settings, update: req.query.update })
	})

	// OAuth

	app.get('/login', passport.authenticate('discord'))

	app.get('/callback', passport.authenticate('discord'), (req, res) => {
		res.redirect(`/me`)
	})

	app.get('/logout', (req, res) => {
		req.session.destroy()
		res.redirect('/')
	})
}

app.listen(3100)
