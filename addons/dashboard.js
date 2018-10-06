/* eslint-disable no-unused-vars */

const express = require('express');
const { Strategy } = require('passport-discord');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../dashboard/templates`);

app.use('static', express.static(`${__dirname}/../dashboard/static`));

module.exports = client => {
	// Views

	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	app.get('/commands', (req, res) => {
		res.render('commands.ejs');
	});

	app.get('/stats', (req, res) => {
		res.render('stats.ejs');
	});

	app.get('/admin', (req, res) => {
		res.render('admin.ejs');
	});

	app.get('/manage/user/:id', (req, res) => {
		res.render('user.ejs');
	});

	app.get('/manage/server/:id', (req, res) => {
		res.render('server.js');
	});

	// OAuth

	app.get('/login');

	app.get('/callback');
};

app.listen(3100);
