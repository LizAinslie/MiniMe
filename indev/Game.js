let BJ = require('../../core/classes/blackjack.js')
module.exports = {
    async run ({
        wiggle,
        reply,
        message,
        author
    }) {
        /* # ■  Require modules */
        let udb = require('../../core/util.js')
        let emojis = require('../../res/emojis.js') // eslint-disable-line no-unused-vars
        let USRDB = udb.UserDB
        let Trainer = await USRDB.findOne({
            id: author.id
        })

        /* # ■  Checking if the author is already on the Database_. */
        if (!Trainer || Trainer.model.gender === 'NOTFINED_') {
            return reply({
                embed: {
                    title: 'Professor Oak',
                    description: "Hey! Wait! Don't go out! It's unsafe! Wild Pokémon live in tall grass! You need your own Pokémon for your protection. I know! Here, come with me!\n<Use the `start` command to get your very first pokemon>",
                    color: 0xEA3D09,
                    thumbnail: {
                        url: 'https://cdn.bulbagarden.net/upload/f/fe/Spr_HGSS_Oak.gif'
                    }
                }
            })
        }

        if (BJ.gameExists(author.id)) {
return reply({
            embed: {
                title: ":negative_squared_cross_mark: You're already playing BlackJack!"
            }
        })
}

        let bet = message.args[0]

        if (bet < 100 || !bet) return reply('You need to bet atleast **100** Pokecoins')
        if (bet > Trainer.model.pokecoins) return reply(`You dont have that much PCNS! (${bet - Trainer.model.pokecoins} Left)`)

        let disGame = new BJ(message)
        let gameDone = false
        let userDeck = disGame.deck
        let botDeck = disGame.house
        let turn = 1

		// --- User 2 card - Dealer 1
        disGame.getHand()
        disGame.hit(userDeck)
        disGame.hit(userDeck)

        disGame.hit(botDeck)

        reply({
            embed: {
                color: 0xA7DB8D,
                fields: [
                {
                    name: author.username,
                    value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                },
                {
                    name: 'House',
                    value: `**Hand: ** =-------------=\n**Value: ** ${BJ.handValue(botDeck)}`
                }]
            }
        })

        async function check () {
			if (BJ.handValue(botDeck) === 'Blackjack') {
                await Trainer.update({
                    'model.pokecoins': Trainer.model.pokecoins - bet
                })
                disGame.finishGame()
                return reply(`You lost! I'm going to remove ${bet} pokecoins from your wallet!`)
			}
			if (BJ.handValue(userDeck) === 'Blackjack') {
                await Trainer.update({
                    $inc: {
                        'model.pokecoins': bet * 1.50
                    }
                })
                disGame.finishGame()
                return reply(`You won! I added ${bet} to your wallet!`)
			}

            if (BJ.handValue(botDeck) === 21 && BJ.handValue(userDeck) === 21) {
                gameDone = true
                reply({
                    embed: {
                        color: 0xA7DB8D,
                        fields: [
                        {
                            name: author.username,
                            value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                        },
                        {
                            name: 'House',
                            value: `**Hand: ** ${botDeck}\n**Value: ** ${BJ.handValue(botDeck)}`
                        }]
                    }
                })

                reply(`Uhm... we both won... So i'm going to remove 50% of the bet from your wallet!`)
                await Trainer.update({
                    'model.pokecoins': Trainer.model.pokecoins - (bet / 2)
                })
                return
            }

            if (BJ.handValue(botDeck) > 21) {
                gameDone = true
                reply({
                    embed: {
                        color: 0xA7DB8D,
                        fields: [
                        {
                            name: author.username,
                            value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                        },
                        {
                            name: 'House BUST',
                            value: `**Hand: ** ${botDeck}\n**Value: ** ${BJ.handValue(botDeck)}`
                        }]
                    }
                })

                reply(`You won! I added ${bet} to your wallet!`)
                await Trainer.update({
                    $inc: {
                        'model.pokecoins': bet
                    }
                })
                disGame.finishGame()
                return
            }

            if (BJ.handValue(userDeck) > 21) {
                gameDone = true
                reply({
                    embed: {
                        color: 0xe66465,
                        fields: [
                        {
                            name: author.username + ' BUST',
                            value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                        },
                        {
                            name: 'House',
                            value: `**Hand: ** ${botDeck}\n**Value: ** ${BJ.handValue(botDeck)}`
                        }]
                    }
                })
                reply(`You lost! I'm going to remove ${bet} pokecoins from your wallet!`)
                await Trainer.update({
                    'model.pokecoins': Trainer.model.pokecoins - bet
                })
                disGame.finishGame()
                return
            }

            if (BJ.handValue(botDeck) === 21) {
                gameDone = true
                reply({
                    embed: {
                        color: 0xe66465,
                        fields: [
                        {
                            name: author.username,
                            value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                        },
                        {
                            name: 'House',
                            value: `**Hand: ** ${botDeck}\n**Value: ** ${BJ.handValue(botDeck)}`
                        }]
                    }
                })
                reply(`You lost! I'm going to remove ${bet} pokecoins from your wallet!`)
                await Trainer.update({
                    'model.pokecoins': Trainer.model.pokecoins - bet
                })
                disGame.finishGame()
                return
            }
            if (BJ.handValue(userDeck) === 21) {
                gameDone = true
                reply({
                    embed: {
                        color: 0xA7DB8D,
                        fields: [
                        {
                            name: author.username,
                            value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                        },
                        {
                            name: 'House',
                            value: `**Hand: ** ${botDeck}\n**Value: ** ${BJ.handValue(botDeck)}`
                        }]
                    }
                })
                reply(`You won! I added ${bet} to your wallet!`)
                await Trainer.update({
                    $inc: {
                        'model.pokecoins': bet
                    }
                })
                disGame.finishGame()
            }
        }

        async function play () {
            await check()

            if (!gameDone) {
                if (turn === 0) {
                    if (BJ.handValue(botDeck) < 18) {
                        disGame.hit(botDeck)
                        turn++
                        await play()
                        return
                    } else {
                        turn++
                        await play()
                        return
                    }
                }

                if (turn === 1) {
					userDeck.forEach(c => console.log(BJ._cardValue(c)))
                                   reply({
                                    embed: {
                                        color: 0xA7DB8D,
                                        fields: [
                                        {
                                            name: author.username,
                                            value: `**Hand: ** ${userDeck}\n**Value: ** ${BJ.handValue(userDeck)}`
                                        },
                                        {
                                            name: 'House',
                                            value: `**Hand: ** =-------------=\n**Value: ** ${BJ.handValue(botDeck)}`
                                        }]
                                    }
                                })
                    message.channel.createMessage('Use `hit` to draw a card, Use `stand` to stand').then(async (m) => {
                        await m.channel.awaitMessages(ms => ms.author.bot === false && ms.author.id === author.id && ['hit', 'stand'].includes(ms.content.toLowerCase()), {
                            time: 30000,
                            maxMatches: 1
                        }).then(async (r) => {
                            let res = r[0]
                            if (!res.content) {
                                turn--
                                await play()
                                return
                            };

                            if (res.content.toLowerCase() === 'stand') {
                                turn--
                                await play()
                                return
                            };

                            if (res.content.toLowerCase() === 'hit') {
                                disGame.hit(userDeck)
                                turn--
                                await play()
                            }
                        })
                    })
                }
            } else {

			}
        }

        await play()
    },
    /* # ■  Command_Settings; */
    description: 'EXPERIMENTAL FEATURE',
    aliases: ['bj'],
    args: [{
        type: 'int',
        label: 'amount',
        optional: true
    }]
}
