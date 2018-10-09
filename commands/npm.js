const { promisify } = require('util');
const packageInfo = promisify(require('npm-registry-package-info'));
const getEmbedColor = require('../util/getHighestRoleColor.js');

exports.run = async (client, msg, args) => {
	const package = args.join('-').toLowerCase();
	if (!package) return msg.channel.createMessage('A package name is required');

	const { meta: { failure }, data: { [package]: info } } = await packageInfo({ packages: [package], latest: true });
	if (failure) return msg.channel.createMessage(`Package \`${package}\` not found on NPM`);

	const dependencies = {
		normal: info.dependencies ? Object.keys(info.dependencies).length : 0,
		dev: info.dependencies ? Object.keys(info.devDependencies).length : 0
	};

	msg.channel.createMessage({
		embed: {
			title: info.name,
			url: `https://npmjs.com/package/${info.name}`,
			color: getEmbedColor(client, msg),
			description: info.description,
			fields: [
				{
					name: 'Version',
					value: info.version,
					inline: true
				},
				{
					name: 'Dependencies',
					value: `${dependencies.normal + dependencies.dev} total dependencies (${dependencies.normal} non-dev, ${dependencies.dev} dev)`,
					inline: true
				},
				{
					name: 'Author',
					value: info.author.name,
					inline: true
				},
				{
					name: 'License',
					value: info.license || 'None',
					inline: true
				},
				{
					name: 'Keywords',
					value: info.keywords ? info.keywords.join(', ') : 'None',
					inline: true
				},
				{
					name: 'Contributors',
					value: info.contributors ? info.contributors.length : 'Unknown',
					inline: true
				},
				{
					name: 'Links',
					value: [info.homepage ? `[Website](${info.homepage})` : null, info.repository ? `[GitHub](${/https:\/\/github.com\/\w+\/\w+/.exec(info.repository.url)[0]})` : null].filter(l => l).join(' | ') || 'None',
					inline: true
				}
			]
		}
	});
};

exports.help = {
	name: 'npm',
	description: 'Gets package info',
	usage: 'npm',
	fullDesc: "Gets information about a package off of NPM",
	type: 'util',
	status: 2,
	aliases: ['nodepackage']
};
