/* eslint-disable no-unused-vars */

const passport = require('passport')
const Strategy = require('passport-discord').Strategy
const session = require('cookie-session')
const Eris = require('eris')

const moment = require('moment')
require('moment-duration-format')
const express = require('express')
const app = express()

const helmet = require('helmet')

const url = require('url')
const path = require('path')

module.exports = client => {
  console.log('dashboard 1')
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`)
  console.log('dashboard 1.1')

  const templateDir = path.resolve(`${dataDir}${path.sep}templates`)
  console.log('dashboard 1.2')

  app.use('/public', express.static(path.resolve(`${dataDir}${path.sep}public`)))
  console.log('dashboard 1.3')

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  console.log('dashboard 1.4')
  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })
  console.log('dashboard 1.5')
  passport.use(new Strategy({
    clientID: client.config.info.id,
    clientSecret: client.config.dashboard.secret,
    callbackURL: client.config.dashboard.callback,
    scope: ['identify', 'guilds', 'guilds.join']
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile))
  }))
  console.log('dashboard 1.6')
  app.use(session({
    name: 'session',
    secret: client.config.dashboard.sessionSecret,

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 * 7 // 7 days
  }))
  console.log('dashboard 1.7')

  app.use(passport.initialize())
  console.log('dashboard 1.8')
  app.use(passport.session())
  console.log('dashboard 1.9')
  app.use(helmet())
  console.log('dashboard 1.10')

  app.locals.domain = client.config.dashboard.domain
  console.log('dashboard 1.11')

  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  var bodyParser = require('body-parser')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  console.log('dashboard 1.12')
  function checkAuth (req, res, next) {
    if (req.isAuthenticated()) return next()
    req.session.backURL = req.url
    res.redirect('/login')
  }
  console.log('dashboard 1.13')

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    }
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data))
  }
  console.log('dashboard 1.14')

  app.get('/login', (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL // eslint-disable-line no-self-assign
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer)
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path
      }
    } else {
      req.session.backURL = '/'
    }
    next()
  },
  passport.authenticate('discord'))
  console.log('dashboard 2')

  app.get('/callback', passport.authenticate('discord', { failureRedirect: '/autherror' }), (req, res) => {
//       addUser(req.user)
    console.log('callback 1')
    if (req.user.id === client.config.ownerID) {
      req.session.isAdmin = true
    } else {
      req.session.isAdmin = false
    }
    console.log('callback 2')
    if (req.session.backURL) {
      console.log('callback 3')
      const url = req.session.backURL
      req.session.backURL = null
      console.log(url)
      res.redirect(url)
      console.log('callback 4')
    } else {
      res.redirect('/')
      console.log('callback 5')
    }
  })

  app.get('/autherror', (req, res) => {
    renderTemplate(res, req, 'autherror.ejs')
  })

  app.get('/logout', function (req, res) {
    req.session.destroy(() => {
      req.logout()
      res.redirect('/')
    })
  })

  app.get('/', (req, res) => {
    renderTemplate(res, req, 'index.ejs')
  })

  app.get('/stats', (req, res) => {
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0)
    const textChannels = client.channels.filter(c => c.type === 'text').size
    const voiceChannels = client.channels.filter(c => c.type === 'voice').size
    const guilds = client.guilds.size
    renderTemplate(res, req, 'stats.ejs', {
      stats: {
        servers: guilds,
        members: members,
        text: textChannels,
        voice: voiceChannels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        nVersion: process.version
      }
    })
  })
  console.log('dashboard 3')

  app.get('/dashboard', checkAuth, (req, res) => {
    renderTemplate(res, req, 'dashboard.ejs')
  })
  console.log('dashboard 4')

//   app.get("/me", checkAuth, (req, res) => {
//     usersDB.get(`SELECT * FROM users WHERE id = ?`, [req.user.id], (err, row) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       let rankLevel
//       if (client.config.ldevelopers.includes(req.user.id) === true) {
//         rankLevel = 10;
//       } else if (client.config.developers.includes(req.user.id) === true) {
//         rankLevel = 9;
//       } else if (client.config.managers.includes(req.user.id) === true) {
//         rankLevel = 8;
//       } else if (client.config.hadmins.includes(req.user.id) === true) {
//         rankLevel = 7;
//       } else if (client.config.admins.includes(req.user.id) === true) {
//         rankLevel = 6;
//       } else if (client.config.hmods.includes(req.user.id) === true) {
//         rankLevel = 5;
//       } else if (client.config.mods.includes(req.user.id) === true) {
//         rankLevel = 4
//       } else if (client.config.premiump.includes(req.user.id) === true) {
//         rankLevel = 3;
//       } else if (client.config.premium.includes(req.user.id) === true) {
//         rankLevel = 2;
//       } else if (client.config.trusted.includes(req.user.id) === true){
//         rankLevel = 1;
//       } else {
//         rankLevel = 0;
//       }
//       const userRank = client.config.permLevels.find(l => l.level === rankLevel).name;
//       let userExp
//       let userLevel
//       let userTitle
//       let userBalance
//       let userBio
//       if (!row) {
//         userExp = 1;
//         userLevel = 1;
//         userBalance = 1;
//         userTitle = "No title was found";
//         userBio = "No bio was found";
//       } else {
//         userExp = row.exp
//         userLevel = row.level
//         userTitle = row.title
//         userBio = row.bio
//         userBalance = row.balance
//       }
//       renderTemplate(res, req, "/user/me.ejs", {userExp, userLevel, userTitle, userBio, userRank, userBalance});
//     })
//   });

//     app.post("/me", checkAuth, (req, res) => {
//     let title = req.body.title;
//     let bio = req.body.bio;
//     if (!title) title = "No title was found"
//     if (!bio) bio = "No bio was found"
//     usersDB.get(`SELECT * FROM users WHERE id = ?`, [req.user.id], (err, row) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       if (!row) {
//         usersDB.run(`INSERT INTO users(id, title, bio) VALUES(?, ?, ?)`, [req.user.id, title, bio], function(err) {
//           if (err) {
//             return console.log(err.message);
//           }
//         });
//       } else {
//         usersDB.run(`UPDATE users SET title = ?, bio = ? WHERE id =? `, [title, bio, req.user.id], function(err) {
//           if (err) {
//             return console.error(err.message);
//           }
//         });
//       }
//     });
//     res.redirect("/me");
//   });

//   app.get("/user", (req, res) => {
//     res.redirect(`/me`);
//   });

//   app.get("/user/:userID", (req, res) => {
//     const user = client.users.get(req.params.userID);
//     if (!user) return res.status(404);
//     usersDB.get(`SELECT * FROM users WHERE id = ?`, [req.params.userID], (err, row) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       let rankLevel
//       if (client.config.ldevelopers.includes(req.params.userID) === true) {
//         rankLevel = 10;
//       } else if (client.config.developers.includes(req.params.userID) === true) {
//         rankLevel = 9;
//       } else if (client.config.managers.includes(req.params.userID) === true) {
//         rankLevel = 8;
//       } else if (client.config.hadmins.includes(req.params.userID) === true) {
//         rankLevel = 7;
//       } else if (client.config.admins.includes(req.params.userID) === true) {
//         rankLevel = 6;
//       } else if (client.config.hmods.includes(req.params.userID) === true) {
//         rankLevel = 5;
//       } else if (client.config.mods.includes(req.params.userID) === true) {
//         rankLevel = 4
//       } else if (client.config.premiump.includes(req.params.userID) === true) {
//         rankLevel = 3;
//       } else if (client.config.premium.includes(req.params.userID) === true) {
//         rankLevel = 2;
//       } else if (client.config.trusted.includes(req.params.userID) === true){
//         rankLevel = 1;
//       } else {
//         rankLevel = 0;
//       }
//       const userRank = client.config.permLevels.find(l => l.level === rankLevel).name;
//       let userExp
//       let userLevel
//       let userBalance
//       let userTitle
//       let userBio
//       if (!row) {
//         userExp = 1;
//         userLevel = 1;
//         userBalance = 1;
//         userTitle = "No title was found";
//         userBio = "No bio was found";
//       } else {
//         userExp = row.exp
//         userBalance = row.balance
//         userLevel = row.level
//         userTitle = row.title
//         userBio = row.bio
//       }
//       var username = user.username
//       renderTemplate(res, req, "/user/user.ejs", {userExp, userLevel, userTitle, userBio, username, userRank, userBalance});
//     })
//   });

  app.get('/dashboard/:guildID', checkAuth, (req, res) => {
    res.redirect(`/dashboard/${req.params.guildID}/manage`)
  })

  // app.get('/leaderboard', (req, res) => {
  //   renderTemplate(res, req, 'leaderboard.ejs')
  // })
  console.log('dashboard 5')
  app.get('/dashboard/:guildID/manage', checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID)
    if (!guild) return res.status(404)
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false
    if (!isManaged && !req.session.isAdmin) res.redirect('/')

    renderTemplate(res, req, 'guild/manage.ejs', {guild})
  })
  async function addUser (user) {
    try {
      let accessToken = user.accessToken
      await client.guilds.get('449696575204229120').addMember(user, {accessToken})
    } catch (e) {
      console.log('Failed to add user to guild.\n' + e)
    }
  }

  app.post('/dashboard/:guildID/manage', checkAuth, (req, res) => {
    client.guildSettings.set(req.params.guildID, {
      logChannel: req.body.serverLog, welcomeChannel: req.body.welcomeLog, ownerRole: req.body.ownerRole, modRole: req.body.modRole, helperRole: req.body.helperRole, muteRole: req.body.muteRole, doWelcomes: req.body.welcomes, doLogs: req.body.logs
    })
    res.redirect('/dashboard/' + req.params.guildID + '/manage')
  })
  console.log('dashboard 6')

  app.listen(3100)
}
