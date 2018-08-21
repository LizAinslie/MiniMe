const passport = require("passport")
const Strategy = require("passport-discord").Strategy
const session = require("express-session");
const LevelStore = require("level-session-store")(session)

const moment = require("moment");
require("moment-duration-format");
const express = require("express");
const app = express();

const helmet = require("helmet")

const url = require("url");
const path = require("path");

const md = require("marked")

module.exports = client => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new Strategy({
    clientID: client.appInfo.id,
    clientSecret: client.config.dashboard.secret,
    callbackURL: client.config.dashboard.callback,
    scope: ["identify", "guilds", "guilds.join"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));
  app.use(session({
    store: new LevelStore("./data/dashboard-session/"),
    secret: client.config.dashboard.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  app.locals.domain = client.config.dashboard.domain;
  
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());      
  app.use(bodyParser.urlencoded({     
    extended: true
  }))
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };


  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
      addUser(req.user)
    if (req.user.id === client.appInfo.owner.id) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/"); 
    });
  });

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });
  
  app.get("/stats", (req, res) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const textChannels = client.channels.filter(c => c.type === "text").size;
    const voiceChannels = client.channels.filter(c => c.type === "voice").size;
    const guilds = client.guilds.size;
    renderTemplate(res, req, "stats.ejs", {
      stats: {
        servers: guilds,
        members: members,
        text: textChannels,
        voice: voiceChannels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        dVersion: Discord.version,
        nVersion: process.version
      }
    });
  });

  app.get("/dashboard", checkAuth, (req, res) => {
    const perms = Discord.Permissions;
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });

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

  app.get("/dashboard/:guildID", checkAuth, (req, res) => {
    res.redirect(`/dashboard/${req.params.guildID}/manage`);
  });

  app.get("/leaderboard", (req, res) => {
    renderTemplate(res, req, "leaderboard.ejs");
  });
  app.get("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/")

    renderTemplate(res, req, "guild/manage.ejs", {guild});
  })
 

  app.post("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    client.guildSettings.set(req.params.guildID, {
      logChannel: req.body.serverLog, welcomeChannel: req.body.welcomeLog, ownerRole: req.body.ownerRole, modRole: req.body.modRole, helperRole: req.body.helperRole, muteRole: req.body.muteRole, doWelcomes: req.body.welcomes, doLogs: req.body.logs
    })
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
}