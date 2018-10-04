const snekfetch = require("snekfetch");

exports.run = async (client, msg, args) => {
    let text = message.mentions.users.first() ? message.author.username + " pats " + message.mentions.users.first().username + "!" : message.author.username + " pats themselves!";
    snekfetch.get(`https://rra.ram.moe/i/r?type=pat`)
             .set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11")
             .end((err, res) => {
                if (err) {
                    msg.channel.createMessage(':exclamation: │ There was an error running the command. This incident has been reported.')
                    Logger.error(client, `[pat.js] snekfetch error.`, err)
                }

                let gif = "https://rra.ram.moe/" + res.body.path;
                message.channel.send(new Discord.RichEmbed().setAuthor(text, message.author.displayAvatarURL, gif)
                                                            .setImage(gif));
             });
}

exports.help = {
    name: 'pat',
    description: 'Pat someone.',
    usage: 'pat',
    fullDesc: 'Pat someone by mentioning them (or pat yourself).',
    type: 'img',
    status: 1,
    aliases: ['pet']
}