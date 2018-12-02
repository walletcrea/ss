const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
var randomItem = require('random-item');
const Markup = require('telegraf/markup');
const bot = new Telegraf("700792286:AAFJ1yWAmccbW9_H_Vi4tl8IOUlEOW9yNQg");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
const fromNow = require('fromnow');
var tim=new Date().toDateString()
var rest = require('restler');
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'
var sb = require('satoshi-bitcoin');
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bz5lysrpv-mysql.services.clever-cloud.com",
    user: "ubl3xtdvmvk5x1sw",
    password: "dDDtJya37IOhtDwLM1y",
    database:"bz5lysrpv"
});

//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());



//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start&&result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var currency='usd'
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa,currency:currency};
            con.query("insert into `account` SET ?", user, function (error, results) {
                console.log(error)
                ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to Escrow Bitcoin🏦.\nEscrow Bitcoin is a P2P platform in telegram where you can: \n<b>🔹️buy </b>and \n<b>🔹️sell Bitcoin </b>\nto other users with where the bot acts as a guarantee the trades take place and provide extra security', Markup
                    .keyboard([
                        ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                        ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                        ['✳️Post trade','⚙️Settings', '🌐About']
                    ])
                    .resize()
                    .extra())
            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var currency='usd'
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        firstname: firstnamee,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                        currency:currency
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var refbonus =100;
                            var ref = 1;
                            var energy=1;
                            var refid = message.text.split(start)[1];
                            var sql = "update `account` set `balance` =`balance`+ '" + refbonus + "', friends =`friends`+ " + ref + ", payoutpoints = `payoutpoints`+" + energy + " where `id` = '" + refid + "'";



                            con.query(sql)

                            ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to Escrow Bitcoin🏦.\nEscrow Bitcoin is a P2P platform in telegram where you can: \n<b>🔹️buy </b>and \n<b>🔹️sell Bitcoin </b>\nto other users with where the bot acts as a guarantee the trades take place and provide extra security', Markup
                                .keyboard([
                                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                                    ['✳️Post trade','⚙️Settings', '🌐About']
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:\n+100 💵\n1⚡️')


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                                    ['✳️Post trade','⚙️Settings', '🌐About']
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                                    ['✳️Post trade','⚙️Settings', '🌐About']
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})


//buy
bot.hears('💵Buy',ctx => {
    var id = ctx.from.id
    var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
    con.query(sql,function (err,result) {
        client.getBuyPrice({'currencyPair': 'BTC-'+result[0].currency}, function (err, price) {
            ctx.replyWithHTML('<b>💵Buy Bitcoin</b>\nBuy bitcoin from other sellers\n\n💲currency: <b>' + result[0].currency + '</b> \n🔺Buy price: <b>' + price.data.amount + ' usd</b>'+'\n🔂Trades: <b>'+result[0].trades+ '</b>'+'\n\n⭐️Ratings: <b>'+result[0].ratings+'</b>\n👦Reviews: <b>('+result[0].love+')😁</b><b>('+result[0].dislike+')</b>😡'+'\n\n<i>select a payment method below👇🏻</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('Advcash', 'Advcash'),
                    m.callbackButton('paypal', 'paypal'),
                    m.callbackButton('square', 'square'),
                    m.callbackButton('Dwolla', 'Dwolla'),
                    m.callbackButton('stripe', 'stripe'),
                    m.callbackButton('paystand', 'paystand'),
                    m.callbackButton('Braintree', 'Braintree'),
                    m.callbackButton('Cashu', 'Cashu'),
                    m.callbackButton('Pingit', 'Pingit'),

                    m.callbackButton('➡️', '➡️')

                ], {columns: 3})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())

                })


        })
    })

    var ide = ctx.from.id
    var activity=new Date()
    var sqli = "update `Trades` set `activity` = '" + activity + "' where `id` = '" + ide + "'";
    con.query(sqli)
con.query("update `sells` set `activity` = '" + activity + "' where `id` = '" + ide + "'")

})

//menu
bot.hears('🏠Menu',ctx => {
    ctx.replyWithHTML('<b>Dashboard</b>', Markup
        .keyboard([
            ['💵Buy', '💰Sell'], // Row1 with 2 buttons
            ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
            ['✳️Post trade','⚙️Settings', '🌐About']
        ])

        .resize()
        .extra())


    var ide = ctx.from.id
    var activity=new Date()
    var sqli = "update `Trades` set `activity` = '" + activity + "' where `id` = '" + ide + "'";
    con.query(sqli)
    con.query("update `sells` set `activity` = '" + activity + "' where `id` = '" + ide + "'")

})



//next
bot.action('⬅️️1',ctx=> {
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Advcash', callback_data:'Advcash'},{text: 'paypal', callback_data: 'paypal'},{text: 'square', callback_data: 'square'}],
                [{text: 'Dwolla', callback_data: 'Dwolla'}, {text: 'stripe', callback_data: 'stripe'},{text: 'paystand', callback_data: 'paystand'}],
                    [{text: 'Braintree', callback_data: 'Braintree'},{text: 'Cashu', callback_data: 'Cashu'},{text: 'Pingit', callback_data: 'Pingit'}],
                [{text: '➡️', callback_data: '➡️'}]

            ]
        },
    )
})
//1

bot.action('➡️',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Credit card', callback_data: 'Credit card'},{text: 'EGOPAY', callback_data: 'EGOPAY'},{text: 'OKPAY', callback_data: 'OKPAY'}],
                [{text: 'Neteller', callback_data: 'Neteller'}, {text: 'National Bank', callback_data: 'National Bank'},{text: 'Onecard', callback_data: 'Onecard'}],
                [{text: 'Paxum', callback_data: 'Paxum'},{text: 'Payeer', callback_data: 'Payeer'},{text: 'Paym', callback_data: 'Paym'}],
                [{text: '⬅️️1', callback_data: '⬅️️1'},{text: '➡️2', callback_data:'➡️2'}]

            ]
        },
    )





})

//page 2
bot.action('⬅️️2',ctx=>{

    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Credit card', callback_data: 'Credit card'},{text: 'EGOPAY', callback_data: 'EGOPAY'},{text: 'OKPAY', callback_data: 'OKPAY'}],
                [{text: 'Neteller', callback_data: 'Neteller'}, {text: 'National Bank', callback_data: 'National Bank'},{text: 'Onecard', callback_data: 'Onecard'}],
                [{text: 'Paxum', callback_data: 'Paxum'},{text: 'Payeer', callback_data: 'Payeer'},{text: 'Paym', callback_data: 'Paym'}],
                [{text: '⬅️️1', callback_data: '⬅️️1'},{text: '➡️2', callback_data:'➡️2'}]

            ]
        },
    )






})


bot.action('➡️2',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Payoneer', callback_data: 'Payoneer'},{text: 'PaySafeCard', callback_data: 'PaySafeCard'},{text: 'Payza', callback_data: 'Payza'}],
                [{text: 'Perfect money', callback_data: 'Perfect money'}, {text: 'Ria', callback_data:'Ria'},{text: 'SEPA', callback_data: 'SEPA'}],
                [{text: 'Wechat', callback_data: 'Wechat'},{text: 'Webmoney', callback_data: 'Webmoney'},{text: 'western union', callback_data: 'western union'}],
                [{text: '⬅️️2', callback_data: '⬅️️2'},{text: '➡️3', callback_data:'➡️3'}]

            ]
        },
    )



})




bot.action('⬅️️3',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Payoneer', callback_data: 'Payoneer'},{text: 'PaySafeCard', callback_data: 'PaySafeCard'},{text: 'Payza', callback_data: 'Payza'}],
                [{text: 'Perfect money', callback_data: 'Perfect money'}, {text: 'Ria', callback_data:'Ria'},{text: 'SEPA', callback_data: 'SEPA'}],
                [{text: 'Wechat', callback_data: 'Wechat'},{text: 'Webmoney', callback_data: 'Webmoney'},{text: 'western union', callback_data: 'western union'}],
                [{text: '⬅️️2', callback_data: '⬅️️2'},{text: '➡️3', callback_data:'➡️3'}]

            ]
        },
    )





})


bot.action('➡️3',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Mpesa', callback_data: 'Mpesa'},{text: 'Skrill', callback_data: 'Skrill'},{text: 'Dash', callback_data: 'Dash'}],
                [{text: 'Swift', callback_data: 'Swift'}, {text: 'BCH', callback_data:'BCH'},{text: 'ETH', callback_data: 'ETH'}],
                [{text: 'LTC', callback_data: 'LTC'},{text: 'XMR', callback_data: 'XMR'},{text: 'BTG', callback_data: 'BTG'}],
                [{text: '⬅️️3', callback_data: '⬅️️3'}]

            ]
        },
    )






})




//sell
bot.hears('💰Sell',ctx => {
    var id = ctx.from.id
    var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
    con.query(sql,function (err,result) {
        client.getSellPrice({'currencyPair': 'BTC-'+result[0].currency}, function (err, price) {
            ctx.replyWithHTML('<b>💰Sell Bitcoin</b>\n💰Sell bitcoin to other buyers\n\n💲currency: <b>' + result[0].currency + '</b> \n🔻sell price: <b>' + price.data.amount + ' usd</b>'+'\n🔂Trades: <b>'+result[0].trades+ '</b>'+'\n\n⭐️Ratings: <b>'+result[0].ratings+'</b>\n👦Reviews: <b>('+result[0].love+')😁</b><b>('+result[0].dislike+')</b>😡'+'\n\n<i>select a payment method below👇🏻</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('Advcash🛄', 'Advcash🛄'),
                    m.callbackButton('paypal🛄', 'paypal🛄'),
                    m.callbackButton('square🛄', 'square🛄'),
                    m.callbackButton('Dwolla🛄', 'Dwolla🛄'),
                    m.callbackButton('stripe🛄', 'stripe🛄'),
                    m.callbackButton('paystand🛄', 'paystand🛄'),
                    m.callbackButton('Braintree🛄', 'Braintree🛄'),
                    m.callbackButton('Cashu🛄', 'Cashu🛄'),
                    m.callbackButton('Pingit🛄', 'Pingit🛄'),

                    m.callbackButton('▶️', '▶️')

                ], {columns: 3})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())

                })


        })

    })

    var ide = ctx.from.id
    var activity=new Date()
    var sqli = "update `Trades` set `activity` = '" + activity + "' where `id` = '" + ide + "'";
    con.query(sqli)
    con.query("update `sells` set `activity` = '" + activity + "' where `id` = '" + ide + "'")

})


//next
bot.action('◀️️1',ctx=> {
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Advcash🛄', callback_data:'Advcash🛄'},{text: 'paypal🛄', callback_data: 'paypal🛄'},{text: 'square🛄', callback_data: 'square🛄'}],
                [{text: 'Dwolla🛄', callback_data: 'Dwolla🛄'}, {text: 'stripe🛄', callback_data: 'stripe🛄'},{text: 'paystand🛄', callback_data: 'paystand🛄'}],
                [{text: 'Braintree🛄', callback_data: 'Braintree🛄'},{text: 'Cashu🛄', callback_data: 'Cashu🛄'},{text: 'Pingit🛄', callback_data: 'Pingit🛄'}],
                [{text: '▶️', callback_data: '▶️'}]

            ]
        },
    )
})
//1

bot.action('▶️',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Credit card🛄', callback_data: 'Credit card🛄'},{text: 'EGOPAY🛄', callback_data: 'EGOPAY🛄'},{text: 'OKPAY', callback_data: 'OKPAY🛄'}],
                [{text: 'Neteller🛄', callback_data: 'Neteller🛄'}, {text: 'National Bank🛄', callback_data: 'National Bank🛄'},{text: 'Onecard🛄', callback_data: 'Onecard🛄'}],
                [{text: 'Paxum🛄', callback_data: 'Paxum🛄'},{text: 'Payeer🛄', callback_data: 'Payeer🛄'},{text: 'Paym🛄', callback_data: 'Paym🛄'}],
                [{text: '◀️️1', callback_data: '◀️️1'},{text: '▶️2', callback_data:'▶️2'}]

            ]
        },
    )





})

//page 2
bot.action('◀️️2',ctx=>{

    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Credit card🛄', callback_data: 'Credit card🛄'},{text: 'EGOPAY🛄', callback_data: 'EGOPAY🛄'},{text: 'OKPAY🛄', callback_data: 'OKPAY🛄'}],
                [{text: 'Neteller🛄', callback_data: 'Neteller🛄'}, {text: 'National Bank🛄', callback_data: 'National Bank🛄'},{text: 'Onecard🛄', callback_data: 'Onecard🛄'}],
                [{text: 'Paxum🛄', callback_data: 'Paxum🛄'},{text: 'Payeer🛄', callback_data: 'Payeer🛄'},{text: 'Paym🛄', callback_data: 'Paym🛄'}],
                [{text: '◀️️1', callback_data: '◀️️1'},{text: '▶️2', callback_data:'▶️2'}]

            ]
        },
    )






})


bot.action('▶️2',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Payoneer🛄', callback_data: 'Payoneer🛄'},{text: 'PaySafeCard🛄', callback_data: 'PaySafeCard🛄'},{text: 'Payza🛄', callback_data: 'Payzav'}],
                [{text: 'Perfect money🛄', callback_data: 'Perfect money🛄'}, {text: 'Ria🛄', callback_data:'Ria🛄'},{text: 'SEPA🛄', callback_data: 'SEPA🛄'}],
                [{text: 'Wechat🛄', callback_data: 'Wechat🛄'},{text: 'Webmoney🛄', callback_data: 'Webmoney🛄'},{text: 'western union🛄', callback_data: 'western union🛄'}],
                [{text: '◀️️2', callback_data: '◀️️2'},{text: '▶️3', callback_data:'▶️3'}]

            ]
        },
    )



})




bot.action('◀️️3',ctx=>{
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Payoneer🛄', callback_data: 'Payoneer🛄'},{text: 'PaySafeCard🛄', callback_data: 'PaySafeCard🛄'},{text: 'Payza🛄', callback_data: 'Payza🛄'}],
                [{text: 'Perfect money🛄', callback_data: 'Perfect money🛄'}, {text: 'Ria🛄', callback_data:'Ria🛄'},{text: 'SEPA🛄', callback_data: 'SEPA🛄'}],
                [{text: 'Wechat🛄', callback_data: 'Wechat🛄'},{text: 'Webmoney🛄', callback_data: 'Webmoney🛄'},{text: 'western union🛄', callback_data: 'western union🛄'}],
                [{text: '◀️️2', callback_data: '◀️️2'},{text: '▶️3', callback_data:'▶️3'}]

            ]
        },
    )





})


bot.action('▶️3',ctx=> {
    ctx.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [{text: 'Mpesa🛄', callback_data: 'Mpesa🛄'}, {text: 'Skrill🛄', callback_data: 'Skrill🛄'}, {
                    text: 'Dash🛄',
                    callback_data: 'Dash🛄'
                }],
                [{text: 'Swift🛄', callback_data: 'Swift🛄'}, {text: 'BCH🛄', callback_data: 'BCH🛄'}, {
                    text: 'ETH🛄',
                    callback_data: 'ETH🛄'
                }],
                [{text: 'LTC🛄', callback_data: 'LTC🛄'}, {text: 'XMR🛄', callback_data: 'XMR🛄'}, {
                    text: 'BTG🛄',
                    callback_data: 'BTG🛄'
                }],
                [{text: '◀️️3', callback_data: '◀️️3'}]

            ]
        },
    )

})
//deposit
bot.hears('📥Deposit',ctx => {
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre.length <= 0) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>📥 Deposit Bitcoin </b>\n\nUse the reusable address below to deposit BTC from an external wallet.\n\n<b>Deposit fee: 0.0002 BTC</b> \n\n<code>' + adress + '</code>\n\n❗️ You should deposit coins on address below first. After which you can sell coins .')
                    var ide =ctx.from.id
                    var sqli = "update `account` set `depoaddre` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>' + adress + '</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>📥 Deposit Bitcoin </b>\n\nUse the reusable address below to deposit BTC from an external wallet.\n\n<b>Deposit fee: 0.0002 BTC</b> \n\n<code>' +results[0].depoaddre + '</code>\n\n❗️️ You should deposit coins on address below first. After which you can sell coins .')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>')

                    })
            })
        }
    })
    var ide = ctx.from.id
    var activity=new Date()
    var sqli = "update `Trades` set `activity` = '" + activity + "' where `id` = '" + ide + "'";
    con.query(sqli)
    con.query("update `sells` set `activity` = '" + activity + "' where `id` = '" + ide + "'")
})

//post trade
bot.hears('✳️Post trade',ctx => {
    ctx.replyWithHTML('<b>✳️Post trade</b>\n\n<i>Post a ad to either buy 💵Bitcoin or 💰Sell Bitcoin\nYou can view your ads at the 💳Balance section of the Menu </i>\n\n<b>♦️Note:</b><i>at the moment you can only have 1 ad of each type,1 for sell and 1 for buy</i>',Markup
        .keyboard([
            ['I want to 💵Buy Bitcoin'],
            ['I want to 💰Sell Bitcoin'],
            ['🏠Menu']

        ])


        .resize()
        .extra())

    var ide = ctx.from.id
    var activity=new Date()
    var sqli = "update `Trades` set `activity` = '" + activity + "' where `id` = '" + ide + "'";
    con.query(sqli)
    con.query("update `sells` set `activity` = '" + activity + "' where `id` = '" + ide + "'")
})

//buy ad
bot.hears('I want to 💵Buy Bitcoin',ctx => {
    ctx.replyWithHTML('<b>choose your payment method below</b>',Markup
        .keyboard([
            ['Advcash'],
            ['paypal'],
            ['square'],
            ['Dwolla'],
            ['stripe'],
            ['paystand'],
            ['Braintree'],
            ['Cashu'],
            ['Pingit'],
            ['Credit card'],
            ['EGOPAY'],
            ['OKPAY'],
            ['Neteller'],
            ['National bank'],
            ['Onecard'],
            ['paxum'],
            ['payeer'],
            ['paym'],
            ['payoneer'],
            ['PaySafeCard'],
            ['Payza'],
            ['perfect Money'],
            ['Ria'],
            ['SEPA'],
            ['Wechat'],
            ['Webmoney'],
            ['Western Union'],
            ['Mpesa'],
            ['Skrill'],
            ['Dash'],
            ['Swift'],
            ['BCH'],
            ['ETH'],
            ['LTC'],
            ['XMR'],
            ['BTG'],
            ['🏠Menu']

        ])


        .resize()
        .extra())





})

//sell ad
bot.hears('I want to 💰Sell Bitcoin',ctx => {
    ctx.replyWithHTML('<b>choose your payment method below</b>',Markup
        .keyboard([
            ['Advcash✅'],
            ['paypal✅'],
            ['square✅'],
            ['Dwolla✅'],
            ['stripe✅'],
            ['paystand✅'],
            ['Braintree✅'],
            ['Cashu✅'],
            ['Pingit✅'],
            ['Credit card✅'],
            ['EGOPAY✅'],
            ['OKPAY✅'],
            ['Neteller✅'],
            ['National bank✅'],
            ['Onecard✅'],
            ['paxum✅'],
            ['payeer✅'],
            ['paym✅'],
            ['payoneer✅'],
            ['PaySafeCard✅'],
            ['Payza✅'],
            ['perfect Money✅'],
            ['Ria✅'],
            ['SEPA✅'],
            ['Wechat✅'],
            ['Webmoney✅'],
            ['Western Union✅'],
            ['Mpesa✅'],
            ['Skrill✅'],
            ['Dash✅'],
            ['Swift✅'],
            ['BCH✅'],
            ['ETH✅'],
            ['LTC✅'],
            ['XMR✅'],
            ['BTG✅'],
            ['🏠Menu']

        ])


        .resize()
        .extra())





})
//add




















//scenes
const buyadscene = new Scene('buyad')
buyadscene.enter((ctx) => {
    var id = ctx.from.id
    con.query("SELECT id,status FROM Trades WHERE id=" + id, function (err, result, fields) {
        if (result.length === 0) {
            var id = ctx.from.id
            var paymentmetthod = ctx.match
            var status = 'active'
            var currency = 'USD'
            var firstname = ctx.from.first_name
            var activity = new Date()
            var user = {
                id: id,
                paymentmethod: paymentmetthod,
                status: status,
                currency: currency,
                firstname: firstname,
                activity: activity
            };
            con.query("insert into `Trades` SET ?", user, function (error, results) {
                console.log(error)
                var id = ctx.from.id
                var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
                con.query(sql, function (err, result) {
                    client.getBuyPrice({'currencyPair': 'BTC-' + result[0].currency}, function (err, price) {
                        ctx.replyWithHTML('<b>📊 Set Rate</b>\n\n <i>Set the rate at which you wish to buy per BTC eg: </i> <b>' + price.data.amount + '</b> \n\n〽️<b>Current buy price : </b><i>1 BTC= ' + price.data.amount + '</i> ' + result[0].currency, Markup
                            .keyboard([
                                ['⛔️Cancel']
                            ])

                            .resize()
                            .extra())
                    })


                })

            })
        } else if (result[0].status === 'active') {
            var idee = ctx.from.id
            var sql = "SELECT status from `sells` where `id` = '" + idee + "'";
            con.query(sql, function (err, res) {
                ctx.replyWithHTML('<b>📰You already have an ad</b>')
                    .then(() => {
                        var id = ctx.from.id
                        var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
                        con.query(sql, function (error, results) {

                            var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
                            con.query(sqli, function (err, result) {
                                ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' + results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min + '<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max + '<b>BTC' + '</b>\n ' + '<b>Status: </b>' + result[0].status + '<b>\nId: </b>' + results[0].id + '\n\n<b>TERMS: </b> <i>' + result[0].terms + '</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🔺Max', '🔺Max'),
                                        m.callbackButton('🔻Min', '🔻Min'),
                                        m.callbackButton('📊Rate', '📊Rate'),
                                        m.callbackButton('📝Terms', '📝Terms'),
                                        m.callbackButton('❌Delete', '❌Delete'),
                                        m.callbackButton('💵Payment method', '💵Payment method'),
                                        m.callbackButton('🔴Turn off', '🔴Turn off')

                                    ], {columns: 2})))
                                    .then(() => {
                                        ctx.reply('click 🏠menu for Mainmenu', Markup
                                            .keyboard([
                                                ['🏠Menu']


                                            ])
                                            .resize()
                                            .extra())
                                            .then(() => {
                                                ctx.scene.leave()
                                            })
                                    })
                            })
                        })
                    })
            })
        } else if (result[0].status === 'inactive') {
            ctx.replyWithHTML('<b>📰You already have an ad</b>')
                .then(() => {
                    var id = ctx.from.id
                    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
                    con.query(sql, function (error, results) {

                        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
                        con.query(sqli, function (err, result) {
                            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' + results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min + '<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max + '<b>BTC' + '</b>\n ' + '<b>Status: </b>' + result[0].status + '<b>\nId: </b>' + results[0].id + '\n\n<b>TERMS: </b> <i>' + result[0].terms + '</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('🔺Max', '🔺Max'),
                                    m.callbackButton('🔻Min', '🔻Min'),
                                    m.callbackButton('📊Rate', '📊Rate'),
                                    m.callbackButton('📝Terms', '📝Terms'),
                                    m.callbackButton('❌Delete', '❌Delete'),
                                    m.callbackButton('💵Payment method', '💵Payment method'),
                                    m.callbackButton('🔆Turn on', '🔆Turn on')

                                ], {columns: 2})))
                                .then(() => {
                                    ctx.reply('click 🏠menu for Mainmenu', Markup
                                        .keyboard([
                                            ['🏠Menu']


                                        ])
                                        .resize()
                                        .extra())
                                        .then(() => {
                                            ctx.scene.leave()
                                        })
                                })
                        })
                    })
                })
        }
    })
})

buyadscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))


buyadscene.on('message',ctx => {
    if (isNaN(ctx.message.text)) {
        ctx.reply('please provide me with a valid rate')
    } else if (isNaN(ctx.message.text) === false) {
        var ide = ctx.from.id
        var sqli = "update `Trades` set `rate` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, results) {
            var id = ctx.from.id
            var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
            con.query(sql, function (err, result) {
                ctx.replyWithHTML('<b>📈 LIMITS</b>\n\nwrite min limit in <b> BTC' + '</b>\n\n <i>eg: </i><b>0.001</b>')
                    .then(()=>{
                        ctx.scene.enter('rate')
                    })
            })
        })
    }
})




//rate scene
const ratescene = new Scene('rate')

ratescene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))
ratescene.on('message',ctx => {
    if (isNaN(ctx.message.text)) {
        ctx.reply('please provide me with a valid min rate')
    } else {
        var ide = ctx.from.id
        var sqli = "update `Trades` set `min` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, results) {
            console.log(err)
            var id = ctx.from.id
            var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
            con.query(sql, function (err, result) {
                ctx.replyWithHTML('<b>📈 LIMITS</b>\n\nwrite max limit in <b>BTC'  + '</b>\n\n <i>eg: </i><b>1000000</b>')
                    .then(() => {
                        ctx.scene.enter('max')
                    })
            })


        })
    }
})

//max scene
const maxscene = new Scene('max')
maxscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))
maxscene.on('message',ctx => {
    if (isNaN(ctx.message.text)) {
        ctx.reply('please provide me with a valid max rate')
    } else {
        var ide = ctx.from.id
        var sqli = "update `Trades` set `max` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, results) {
            ctx.replyWithHTML('<b>🏞 Advert has been created</b>')
                .then(() => {
                    ctx.scene.leave()
                })
        })
    }
})

maxscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔺Max', '🔺Max'),
                    m.callbackButton('🔻Min', '🔻Min'),
                    m.callbackButton('📊Rate', '📊Rate'),
                    m.callbackButton('📝Terms', '📝Terms'),
                    m.callbackButton('❌Delete', '❌Delete'),
                    m.callbackButton('💵Payment method', '💵Payment method'),
                    m.callbackButton('🔴Turn off', '🔴Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

///////////////////////////////
//SELL AD///////////////////////
///////////////////////////
const selladscene = new Scene('sellad')
selladscene.enter((ctx) => {
    var id = ctx.from.id
    con.query("SELECT id,status FROM sells WHERE id=" + id, function (err, result, fields) {
        if (result.length === 0) {
            var id = ctx.from.id
            var paymentmetthod = ctx.match
            var status = 'active'
            var currency = 'USD'
            var firstname = ctx.from.first_name
            var activity = new Date()
            var user = {
                id: id,
                paymentmethod: paymentmetthod,
                status: status,
                currency: currency,
                firstname: firstname,
                activity: activity
            };
            con.query("insert into `sells` SET ?", user, function (error, results) {
                console.log(error)
                var id = ctx.from.id
                var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
                con.query(sql, function (err, result) {
                    client.getSellPrice({'currencyPair': 'BTC-' + result[0].currency}, function (err, price) {
                        ctx.replyWithHTML('<b>📊 Set Rate</b>\n\n <i>Set the rate at which you wish to sell per BTC eg: </i> <b>' + price.data.amount + '</b> \n\n〽️<b>Current sell price : </b><i>1 BTC= ' + price.data.amount + '</i> ' + result[0].currency, Markup
                            .keyboard([
                                ['⛔️Cancel']
                            ])

                            .resize()
                            .extra())
                    })


                })

            })
        } else if (result[0].status==='active') {
            var idee = ctx.from.id
            var sql = "SELECT status from `sells` where `id` = '" + idee + "'";
            con.query(sql, function (err, res) {
                ctx.replyWithHTML('<b>📰You already have an ad</b>')
                    .then(() => {
                        var id = ctx.from.id
                        var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
                        con.query(sql, function (error, results) {

                            var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
                            con.query(sqli, function (err, result) {
                                ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵sell Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' + results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min + '<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max + '<b>BTC' + '</b>\n ' + '<b>Status: </b>' + result[0].status + '<b>\nId: </b>' + results[0].id + '\n\n<b>TERMS: </b> <i>' + result[0].terms + '</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🔶Max', '🔶Max'),
                                        m.callbackButton('🔷Min', '🔷Min'),
                                        m.callbackButton('📉Rate', '📉Rate'),
                                        m.callbackButton('🗓Terms', '🗓Terms'),
                                        m.callbackButton('💢Delete', '💢Delete'),
                                        m.callbackButton('🏦Payment method', '🏦Payment method'),
                                        m.callbackButton('📛Turn off', '📛Turn off')
                                    ], {columns: 2})))
                                    .then(() => {
                                        ctx.reply('click 🏠menu for Mainmenu', Markup
                                            .keyboard([
                                                ['🏠Menu']


                                            ])
                                            .resize()
                                            .extra())
                                            .then(() => {
                                                ctx.scene.leave()
                                            })
                                    })
                            })
                        })
                    })
            })
        } else if(result[0].status==='inactive'){
                    ctx.replyWithHTML('<b>📰You already have an ad</b>')
                        .then(() => {
                            var id = ctx.from.id
                            var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
                            con.query(sql, function (error, results) {

                                var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
                                con.query(sqli, function (err, result) {
                                    ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵sell Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' + results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min + '<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max + '<b>BTC' + '</b>\n ' + '<b>Status: </b>' + result[0].status + '<b>\nId: </b>' + results[0].id + '\n\n<b>TERMS: </b> <i>' + result[0].terms + '</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('🔶Max', '🔶Max'),
                                            m.callbackButton('🔷Min', '🔷Min'),
                                            m.callbackButton('📉Rate', '📉Rate'),
                                            m.callbackButton('🗓Terms', '🗓Terms'),
                                            m.callbackButton('💢Delete', '💢Delete'),
                                            m.callbackButton('🏦Payment method', '🏦Payment method'),
                                            m.callbackButton('🔅Turn on', '🔅Turn on')
                                        ], {columns: 2})))
                                        .then(() => {
                                            ctx.reply('click 🏠menu for Mainmenu', Markup
                                                .keyboard([
                                                    ['🏠Menu']


                                                ])
                                                .resize()
                                                .extra())
                                                .then(() => {
                                                    ctx.scene.leave()
                                                })
                                        })
                                })
                            })
                        })

                }
            })
        })

selladscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))


selladscene.on('message',ctx => {
    if (isNaN(ctx.message.text)) {
        ctx.reply('please provide me with a valid rate')
    } else if (isNaN(ctx.message.text) === false) {
        var ide = ctx.from.id
        var sqli = "update `sells` set `rate` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, results) {
            var id = ctx.from.id
            var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
            con.query(sql, function (err, result) {
                ctx.replyWithHTML('<b>📈 LIMITS</b>\n\nwrite min limit in <b> BTC' + '</b>\n\n <i>eg: </i><b>0.001</b>')
                    .then(()=>{
                        ctx.scene.enter('rates')
                    })
            })
        })
    }
})




//rate scene
const ratesscene = new Scene('rates')

ratesscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))
ratesscene.on('message',ctx => {
    if (isNaN(ctx.message.text)) {
        ctx.reply('please provide me with a valid min rate')
    } else {
        var ide = ctx.from.id
        var sqli = "update `sells` set `min` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, results) {
            console.log(err)
            var id = ctx.from.id
            var sql = "SELECT currency,trades,love,ratings,dislike from `account` where `id` = '" + id + "'";
            con.query(sql, function (err, result) {
                ctx.replyWithHTML('<b>📈 LIMITS</b>\n\nwrite max limit in <b>BTC'  + '</b>\n\n <i>eg: </i><b>1000000</b>')
                    .then(() => {
                        ctx.scene.enter('maxs')
                    })
            })


        })
    }
})

//max scene
const maxsscene = new Scene('maxs')
maxsscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))
maxsscene.on('message',ctx => {
    if (isNaN(ctx.message.text)) {
        ctx.reply('please provide me with a valid max rate')
    } else {
        var ide = ctx.from.id
        var sqli = "update `sells` set `max` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, results) {
            ctx.replyWithHTML('<b>🏞 Advert has been created</b>')
                .then(() => {
                    ctx.scene.leave()
                })
        })
    }
})

maxsscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵sell Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔶Max', '🔶Max'),
                    m.callbackButton('🔷Min', '🔷Min'),
                    m.callbackButton('📉Rate', '📉Rate'),
                    m.callbackButton('🗓Terms', '🗓Terms'),
                    m.callbackButton('💢Delete', '💢Delete'),
                    m.callbackButton('🏦Payment method', '🏦Payment method'),
                    m.callbackButton('📛Turn off', '📛Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})


//////////////////////////////////////////////////////////
//
//
//TRADE SCENE
//
//
/////////////////////////////////
const tradescene = new Scene('trade')
tradescene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))
tradescene.on('message',ctx =>{
    if (isNaN(ctx.message.text)){
        ctx.reply('please provide a valid amount in btc')
    } else {
        var ide = ctx.from.id
        var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency from `Trades` where `id` = '" + ide + "'";
        con.query(sql, function (err, results) {

            var ide = results[0].partner
            var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency from `Trades` where `id` = '" + ide + "'";
            con.query(sql, function (err, result) {

                var rat = result[0].rate
                var rate = ctx.message.text * rat
                ctx.telegram.sendMessage(results[0].partner, '💵NEW TRADE\n\n ' + results[0].firstname + ' wishes to sell <b>' + ctx.message.text + '</b> Bitcoins to you which equals  <b>' + Math.round(rate) + result[0].currency + '</b>  according to your rate', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('✅I have paid', '✅I have paid'),
                        m.callbackButton('❌Cancel', '❌Cancel'),
                        m.callbackButton('🤚Dispute trade', '🤚Dispute trade')
                    ], {columns: 2})))
                    .then(() => {
                        ctx.telegram.sendMessage(results[0].partner,'click 🏠Menu to go back to Main menu ', Markup
                            .keyboard([
                                ['🏠Menu']


                            ])
                            .resize()
                            .extra())
                            .then(() => {
                                ctx.scene.enter('trade2')
                            })
                    })


            })
        })
    }
})

const trade2scene = new Scene('trade2')
trade2scene.enter((ctx) => {
    var ide = ctx.from.id
    var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency from `Trades` where `id` = '" + ide + "'";
    con.query(sql, function (err, results) {

        var id = results[0].partner
        var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency,terms from `Trades` where `id` = '" + id + "'";
        con.query(sql, function (err, result) {
            var rat = result[0].rate
            var rate = ctx.message.text * rat

            ctx.replyWithHTML('The buyer has been notified\n\n According to the buyers rate he/she should pay you <b>' + rate + '</b><i>' + result[0].currency + '</i>\n\n<b>Terms of trade: </b> <i>'+result[0].terms+'</i>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('✅Release Bitcoins', '✅Release Bitcoins'),
                    m.callbackButton('❌Cancel', '❌Cancel'),
                    m.callbackButton('🤚Dispute trade', '🤚Dispute trade')
                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})


///////////////Terms
const termsscene = new Scene('terms')
termsscene.enter((ctx) => {
  ctx.reply('write below the terms of trade to be shown on your ad',Markup
      .keyboard([
          ['⛔️Cancel']
      ])
      .resize()
      .extra())
})
termsscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

termsscene.on('message',ctx => {
    var ide = ctx.from.id
    var message=ctx.message.text
    var sqli = "update `Trades` set `terms` = '" + message + "' where `id` = '" + ide + "'";
    con.query(sqli,function (err,res) {
        ctx.reply('done')
            .then(()=>{
              ctx.scene.leave()
            })
    })




})
termsscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔺Max', '🔺Max'),
                    m.callbackButton('🔻Min', '🔻Min'),
                    m.callbackButton('📊Rate', '📊Rate'),
                    m.callbackButton('📝Terms', '📝Terms'),
                    m.callbackButton('❌Delete', '❌Delete'),
                    m.callbackButton('💵Payment method', '💵Payment method'),
                    m.callbackButton('🔴Turn off', '🔴Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})
////////set min
const setminscene = new Scene('setmin')
setminscene.enter((ctx) => {
    ctx.reply('write below the min amount in btc to update it',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setminscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setminscene.on('message',ctx => {
    if (isNaN(ctx.message.text)){
        ctx.reply('give me a valid Min amount in BTC ')
    }else {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `Trades` set `min` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setminscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔺Max', '🔺Max'),
                    m.callbackButton('🔻Min', '🔻Min'),
                    m.callbackButton('📊Rate', '📊Rate'),
                    m.callbackButton('📝Terms', '📝Terms'),
                    m.callbackButton('❌Delete', '❌Delete'),
                    m.callbackButton('💵Payment method', '💵Payment method'),
                    m.callbackButton('🔴Turn off', '🔴Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

//set max
const setmaxscene = new Scene('setmax')
setmaxscene.enter((ctx) => {
    ctx.reply('write below the max amount in btc to update it',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setmaxscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setmaxscene.on('message',ctx => {
    if (isNaN(ctx.message.text)){
        ctx.reply('give me a valid Max amount in BTC ')
    }else {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `Trades` set `max` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setmaxscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔺Max', '🔺Max'),
                    m.callbackButton('🔻Min', '🔻Min'),
                    m.callbackButton('📊Rate', '📊Rate'),
                    m.callbackButton('📝Terms', '📝Terms'),
                    m.callbackButton('❌Delete', '❌Delete'),
                    m.callbackButton('💵Payment method', '💵Payment method'),
                    m.callbackButton('🔴Turn off', '🔴Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

/////////set rate
const setratescene = new Scene('setrate')
setratescene.enter((ctx) => {
    ctx.reply('write below the rate at which you wish buy per BTC in USD to update it',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setratescene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setratescene.on('message',ctx => {
    if (isNaN(ctx.message.text)){
        ctx.reply('give me a valid rate amount amount in BTC ')
    }else {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `Trades` set `rate` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setratescene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔺Max', '🔺Max'),
                    m.callbackButton('🔻Min', '🔻Min'),
                    m.callbackButton('📊Rate', '📊Rate'),
                    m.callbackButton('📝Terms', '📝Terms'),
                    m.callbackButton('❌Delete', '❌Delete'),
                    m.callbackButton('💵Payment method', '💵Payment method'),
                    m.callbackButton('🔴Turn off', '🔴Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

//////set payment method
const setpaymentscene = new Scene('setpayment')
setpaymentscene.enter((ctx) => {
    ctx.replyWithHTML('Change your payment method\n\n<b>write your new payment method based on the bot otherwise your ad wont be viewable eg Advcash</b>',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setpaymentscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setpaymentscene.on('message',ctx => {
    if (isNaN(ctx.message.text)===false){
        ctx.reply('please provide a valid payment method ')
    }else if (isNaN(ctx.message.text)) {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `Trades` set `paymentmethod` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setpaymentscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔺Max', '🔺Max'),
                    m.callbackButton('🔻Min', '🔻Min'),
                    m.callbackButton('📊Rate', '📊Rate'),
                    m.callbackButton('📝Terms', '📝Terms'),
                    m.callbackButton('❌Delete', '❌Delete'),
                    m.callbackButton('💵Payment method', '💵Payment method'),
                    m.callbackButton('🔴Turn off', '🔴Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})




////////////////////////////////////
//
//set sells rate
//
//
//////////////////////////////////
const termsellscene = new Scene('termsell')
termsellscene.enter((ctx) => {
    ctx.reply('write below the terms of trade to be shown on your ad',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
termsellscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

termsellscene.on('message',ctx => {
    var ide = ctx.from.id
    var message=ctx.message.text
    var sqli = "update `sells` set `terms` = '" + message + "' where `id` = '" + ide + "'";
    con.query(sqli,function (err,res) {
        ctx.reply('done')
            .then(()=>{
                ctx.scene.leave()
            })
    })




})
termsellscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔶Max', '🔶Max'),
                    m.callbackButton('🔷Min', '🔷Min'),
                    m.callbackButton('📉Rate', '📉Rate'),
                    m.callbackButton('🗓Terms', '🗓Terms'),
                    m.callbackButton('💢Delete', '💢Delete'),
                    m.callbackButton('🏦Payment method', '🏦Payment method'),
                    m.callbackButton('📛Turn off', '📛Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})
////////set min
const setminsellscene = new Scene('setminsell')
setminsellscene.enter((ctx) => {
    ctx.reply('write below the min amount in btc to update it',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setminsellscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setminsellscene.on('message',ctx => {
    if (isNaN(ctx.message.text)){
        ctx.reply('give me a valid Min amount in BTC ')
    }else {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `sells` set `min` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setminsellscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔶Max', '🔶Max'),
                    m.callbackButton('🔷Min', '🔷Min'),
                    m.callbackButton('📉Rate', '📉Rate'),
                    m.callbackButton('🗓Terms', '🗓Terms'),
                    m.callbackButton('💢Delete', '💢Delete'),
                    m.callbackButton('🏦Payment method', '🏦Payment method'),
                    m.callbackButton('📛Turn off', '📛Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

//set max
const setmaxsellscene = new Scene('setmaxsell')
setmaxsellscene.enter((ctx) => {
    ctx.reply('write below the max amount in btc to update it',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setmaxsellscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setmaxsellscene.on('message',ctx => {
    if (isNaN(ctx.message.text)){
        ctx.reply('give me a valid Max amount in BTC ')
    }else {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `sells` set `max` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setmaxsellscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔶Max', '🔶Max'),
                    m.callbackButton('🔷Min', '🔷Min'),
                    m.callbackButton('📉Rate', '📉Rate'),
                    m.callbackButton('🗓Terms', '🗓Terms'),
                    m.callbackButton('💢Delete', '💢Delete'),
                    m.callbackButton('🏦Payment method', '🏦Payment method'),
                    m.callbackButton('📛Turn off', '📛Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

/////////set rate
const setratesellscene = new Scene('setratesell')
setratesellscene.enter((ctx) => {
    ctx.reply('write below the rate at which you wish sell per BTC in USD to update it',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setratesellscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setratesellscene.on('message',ctx => {
    if (isNaN(ctx.message.text)){
        ctx.reply('give me a valid rate amount amount in BTC ')
    }else {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `sells` set `rate` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setratesellscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔶Max', '🔶Max'),
                    m.callbackButton('🔷Min', '🔷Min'),
                    m.callbackButton('📉Rate', '📉Rate'),
                    m.callbackButton('🗓Terms', '🗓Terms'),
                    m.callbackButton('💢Delete', '💢Delete'),
                    m.callbackButton('🏦Payment method', '🏦Payment method'),
                    m.callbackButton('📛Turn off', '📛Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

//////set payment method
const setpaymentsellscene = new Scene('setpaymentsell')
setpaymentsellscene.enter((ctx) => {
    ctx.replyWithHTML('Change your payment method\n\n<b>write your new payment method based on the bot otherwise your ad wont be viewable eg:Advcash?</b>',Markup
        .keyboard([
            ['⛔️Cancel']
        ])
        .resize()
        .extra())
})
setpaymentsellscene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
        .then(()=>{
            ctx.replyWithHTML('cancelled',Markup
                .keyboard([
                    ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                    ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                    ['✳️Post trade','⚙️Settings', '🌐About']
                ])
                .resize()
                .extra())


        })

))

setpaymentsellscene.on('message',ctx => {
    if (isNaN(ctx.message.text)===false){
        ctx.reply('please provide a valid payment method ')
    }else if (isNaN(ctx.message.text)) {
        var ide = ctx.from.id
        var message = ctx.message.text
        var sqli = "update `sells` set `paymentmethod` = '" + message + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, res) {
            ctx.reply('done')
                .then(() => {
                    ctx.scene.leave()
                })
        })

    }


})
setpaymentsellscene.leave((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results) {

        var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
        con.query(sqli, function (err, result) {

            console.log(err)
            console.log(result)
            ctx.replyWithHTML('<b>🏞My ads</b>\n\n<b>💵Buy Bitcoins</b>\n\n<b>Payment method: </b>' + result[0].paymentmethod + '\n<b>Rate BTC: </b>' + result[0].rate + '<b>' +results[0].currency + '</b>\n<b>Min value: </b>' + result[0].min +'<b>BTC' + '</b>\n<b>Max value: </b>' + result[0].max +'<b>BTC'  + '</b>\n '+'<b>Status: </b>'+ result[0].status+'<b>\nId: </b>' + results[0].id+'\n\n<b>TERMS: </b> <i>'+result[0].terms+'</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🔶Max', '🔶Max'),
                    m.callbackButton('🔷Min', '🔷Min'),
                    m.callbackButton('📉Rate', '📉Rate'),
                    m.callbackButton('🗓Terms', '🗓Terms'),
                    m.callbackButton('💢Delete', '💢Delete'),
                    m.callbackButton('🏦Payment method', '🏦Payment method'),
                    m.callbackButton('📛Turn off', '📛Turn off')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())
                })
        })
    })
})

































///////
const stage = new Stage([buyadscene,ratescene,maxscene,maxsscene,ratesscene,selladscene,tradescene,trade2scene,termsscene,setmaxscene,setminscene,setpaymentscene,setratescene,setmaxsellscene,setminsellscene,setpaymentsellscene,setratesellscene,termsellscene], { ttl: 1800 })
bot.use(session())
bot.use(stage.middleware())
bot.hears('Advcash',enter('buyad'))
bot.hears('paypal',enter('buyad'))
bot.hears('square',enter('buyad'))
bot.hears('Dwolla',enter('buyad'))
bot.hears('stripe',enter('buyad'))
bot.hears('paystand',enter('buyad'))
bot.hears('Braintree',enter('buyad'))
bot.hears('Cashu',enter('buyad'))
bot.hears('Pingit',enter('buyad'))
bot.hears('Credit card',enter('buyad'))
bot.hears('EGOPAY',enter('buyad'))
bot.hears('OKPAY',enter('buyad'))
bot.hears('Neteller',enter('buyad'))
bot.hears('National bank',enter('buyad'))
bot.hears('Onecard',enter('buyad'))
bot.hears('paxum',enter('buyad'))
bot.hears('payeer',enter('buyad'))
bot.hears('paym',enter('buyad'))
bot.hears('payoneer',enter('buyad'))
bot.hears('PaySafeCard',enter('buyad'))
bot.hears('Payza',enter('buyad'))
bot.hears('perfect Money',enter('buyad'))
bot.hears('Ria',enter('buyad'))
bot.hears('SEPA',enter('buyad'))
bot.hears('Wechat',enter('buyad'))
bot.hears('Webmoney',enter('buyad'))
bot.hears('Western Union',enter('buyad'))
bot.hears('Mpesa',enter('buyad'))
bot.hears('Skrill',enter('buyad'))
bot.hears('Dash',enter('buyad'))
bot.hears('Swift',enter('buyad'))
bot.hears('BCH',enter('buyad'))
bot.hears('ETH',enter('buyad'))
bot.hears('LTC',enter('buyad'))
bot.hears('XMR',enter('buyad'))
bot.hears('BTG',enter('buyad'))


//sell ad
bot.hears('Advcash✅',enter('sellad'))
bot.hears('paypal✅',enter('sellad'))
bot.hears('square✅',enter('sellad'))
bot.hears('Dwolla✅',enter('sellad'))
bot.hears('stripe✅',enter('sellad'))
bot.hears('paystand✅',enter('sellad'))
bot.hears('Braintree✅',enter('sellad'))
bot.hears('Cashu✅',enter('sellad'))
bot.hears('Pingit✅',enter('sellad'))
bot.hears('Credit card✅',enter('sellad'))
bot.hears('EGOPAY✅',enter('sellad'))
bot.hears('OKPAY✅',enter('sellad'))
bot.hears('Neteller✅',enter('sellad'))
bot.hears('National bank✅',enter('sellad'))
bot.hears('Onecard✅',enter('sellad'))
bot.hears('paxum✅',enter('sellad'))
bot.hears('payeer✅',enter('sellad'))
bot.hears('paym✅',enter('sellad'))
bot.hears('payoneer✅',enter('sellad'))
bot.hears('PaySafeCard✅',enter('sellad'))
bot.hears('Payza✅',enter('sellad'))
bot.hears('perfect Money✅',enter('sellad'))
bot.hears('Ria✅',enter('sellad'))
bot.hears('SEPA✅',enter('sellad'))
bot.hears('Wechat✅',enter('sellad'))
bot.hears('Webmoney✅',enter('sellad'))
bot.hears('Western Union✅',enter('sellad'))
bot.hears('Mpesa✅',enter('sellad'))
bot.hears('Skrill✅',enter('sellad'))
bot.hears('Dash✅',enter('sellad'))
bot.hears('Swift✅',enter('sellad'))
bot.hears('BCH✅',enter('sellad'))
bot.hears('ETH✅',enter('sellad'))
bot.hears('LTC✅',enter('sellad'))
bot.hears('XMR✅',enter('sellad'))
bot.hears('BTG✅',enter('sellad'))
bot.action('📝Terms',enter('terms'))
bot.action('🔻Min',enter('setmin'))
bot.action('🔺Max',enter('setmax'))
bot.action('📊Rate',enter('setrate'))
bot.action('💵Payment method',enter('setpayment'))

//set sell
bot.action('🗓Terms',enter('termsell'))
bot.action('🔷Min',enter('setminsell'))
bot.action('🔶Max',enter('setmaxsell'))
bot.action('📉Rate',enter('setratesell'))
bot.action('🏦Payment method',enter('setpaymentsell'))



































































////sell advcash
bot.action('Advcash🛄',ctx=>{
    var paymentmethod='Advcash'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//paypal
bot.action('paypal🛄',ctx=>{
    var paymentmethod='paypal'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//square
bot.action('square🛄',ctx=>{
    var paymentmethod='square'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Dwolla
bot.action('Dwolla🛄',ctx=>{
    var paymentmethod='Dwolla'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//stripe
bot.action('stripe🛄',ctx=>{
    var paymentmethod='stripe'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//paystand
bot.action('paystand🛄',ctx=>{
    var paymentmethod='paystand'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Braintree
bot.action('Braintree🛄',ctx=>{
    var paymentmethod='Braintree'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Cashu
bot.action('Cashu🛄',ctx=>{
    var paymentmethod='Cashu'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Pingit
bot.action('Pingit🛄',ctx=>{
    var paymentmethod='Pingit'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Credit card
bot.action('Credit card🛄',ctx=>{
    var paymentmethod='Credit card'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//EGOPAY
bot.action('EGOPAY🛄',ctx=>{
    var paymentmethod='EGOPAY'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//OKPAY
bot.action('OKPAY🛄',ctx=>{
    var paymentmethod='OKPAY'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Neteller
bot.action('Neteller🛄',ctx=>{
    var paymentmethod='Neteller'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//National Bank
bot.action('National Bank🛄',ctx=>{
    var paymentmethod='National Bank'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Onecard
bot.action('Onecard🛄',ctx=>{
    var paymentmethod='Onecard'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//paxum
bot.action('Paxum🛄',ctx=>{
    var paymentmethod='Paxum'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Payeer
bot.action('Payeer🛄',ctx=>{
    var paymentmethod='Payeer'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Paym
bot.action('Paym🛄',ctx=>{
    var paymentmethod='Paym'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})


//Payoneer
bot.action('Payoneer🛄',ctx=>{
    var paymentmethod='Payoneer'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//PaySafeCard
bot.action('PaySafeCard🛄',ctx=>{
    var paymentmethod='PaySafeCard'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Payza
bot.action('Payza🛄',ctx=>{
    var paymentmethod='Payza'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Perfect money
bot.action('Perfect money🛄',ctx=>{
    var paymentmethod='Perfect money'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Ria
bot.action('Ria🛄',ctx=>{
    var paymentmethod='Ria'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//SEPA
bot.action('SEPA🛄',ctx=>{
    var paymentmethod='SEPA'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Wechat
bot.action('Wechat🛄',ctx=>{
    var paymentmethod='Wechat'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Webmoney
bot.action('Webmoney🛄',ctx=>{
    var paymentmethod='Webmoney'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//western union
bot.action('western union🛄',ctx=>{
    var paymentmethod='western union'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Mpesa
bot.action('Mpesa🛄',ctx=>{
    var paymentmethod='Mpesa'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//skrill
bot.action('Skrill🛄',ctx=>{
    var paymentmethod='Skrill'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Dash
bot.action('Dash🛄',ctx=>{
    var paymentmethod='Dash'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Swift
bot.action('Swift🛄',ctx=>{
    var paymentmethod='Swift'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//BCH
bot.action('BCH🛄',ctx=>{
    var paymentmethod='BCH'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//ETH
bot.action('ETH🛄',ctx=>{
    var paymentmethod='ETH'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//LTC
bot.action('LTC🛄',ctx=>{
    var paymentmethod='LTC'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//XMR
bot.action('XMR🛄',ctx=>{
    var paymentmethod='XMR'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//BTG
bot.action('BTG🛄',ctx=>{
    var paymentmethod='BTG'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `Trades` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Buyers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵SELL BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('🔑Open deal ' + res.id, '🔑Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})








/////////////////////////\\\\\\\\\\
//
//sellers ads
//
////////////////////\\\\\\\\\\\\\\\\\\//
bot.action('Advcash',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//paypal
bot.action('paypal',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//square
bot.action('square',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Dwolla
bot.action('Dwolla',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//stripe
bot.action('stripe',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//paystand
bot.action('paystand',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Braintree
bot.action('Braintree',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Cashu
bot.action('Cashu',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Pingit
bot.action('Pingit',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Credit card
bot.action('Credit card',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//EGOPAY
bot.action('EGOPAY',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//OKPAY
bot.action('OKPAY',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Neteller
bot.action('Neteller',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//National Bank
bot.action('National Bank',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Onecard
bot.action('Onecard',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Paxum
bot.action('Paxum',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Payeer
bot.action('Payeer',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Paym
bot.action('Paym',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})


//Payoneer
bot.action('Payoneer',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//PaySafeCard
bot.action('PaySafeCard',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Payza
bot.action('Payza',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Perfect money
bot.action('Perfect money',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
///Ria
bot.action('Ria',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
///SEPA
bot.action('SEPA',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Wechat
bot.action('Wechat',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Webmoney
bot.action('Webmoney',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
///western union
bot.action('western union',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//Mpesa
bot.action('Mpesa',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Skrill
bot.action('Skrill',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Dash
bot.action('Dash',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//Swift
bot.action('Swift',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//BCH
bot.action('BCH',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//ETH
bot.action('ETH',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

//LTC
bot.action('LTC',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})

///////XMR
bot.action('XMR',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})
//BTG
bot.action('BTG',ctx=>{
    var paymentmethod=ctx.match+'?'
    var sql = "SELECT paymentmethod,id,rate,min,max,firstname,currency,love,trades,ratings,dislike,activity from `sells` where `paymentmethod` = '" + paymentmethod + "'and `status`='active'";
    con.query(sql, function (error, results) {
        if (results.length>=1) {
            ctx.replyWithHTML('There are a total of (<b>' + results.length + '</b>) Sellers with paymentmethod (<b>' + ctx.match + '</b>)')
                .then(() => {
                    results.forEach(function (res) {
                        ctx.replyWithHTML('<b>💵BUY BITCOINs</b>(' + ctx.match + ')\n\n<b>Firstname: </b>' + res.firstname + '<b>\nId: </b>' + res.id + '\n<b>Payment method: </b>' + res.paymentmethod + '\n<b>Rate: </b>' + res.rate + '<b>' + res.currency + '</b>' + '\n<b>Min: </b>' + res.min + '<b>BTC' + '</b>' + '<b>\nMax: </b>' + res.max + '<b>BTC' + '</b>' + '\n\n🔂Trades: <b>' + res.trades + '</b>' + '\n\n⭐️Ratings: <b>' + res.ratings + '</b>\n👦Reviews: <b>(' + res.love + ')😁</b><b>(' + res.dislike + ')</b>😡' + '\nlast seen: <b>' + fromNow(res.activity) + '</b>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('💵Open deal ' + res.id, '💵Open deal ' + res.id)
                            ], {columns: 2})))
                    })
                })
        }else {
            ctx.replyWithHTML('<b>😥There are currently no ads with paymentmethod </b><i>'+ctx.match+'</i>')
        }
    })

})


/////////////////////////////////////////////////////////
///
//END SELL AD
//
/////////////////////////////////////////////////////////

bot.action('📛Turn off',ctx=>{
    var ide = ctx.from.id
    var status='inactive'
    var sqli = "update `sells` set `status` = '" + status + "' where `id` = '" + ide + "'";
    con.query(sqli, function (err, result) {
        ctx.editMessageReplyMarkup(
            {
                inline_keyboard: [
                    [{text: '🔶Max', callback_data: '🔶Max'}, {text: '🔷Min', callback_data: '🔷Min'}],
                    [{text: '📉Rate', callback_data: '📉Rate'}, {text: '🗓Terms', callback_data: '🗓Terms'}],
                    [{text: '💢Delete', callback_data: '💢Delete'}, {
                        text: '🏦Payment method',
                        callback_data: '🏦Payment method'
                    }],
                    [{text: '🔅Turn on', callback_data: '🔅Turn on'}],


                ]
            },
        )


    })
})

//
bot.action('🔴Turn off',ctx=>{
    var ide = ctx.from.id
    var status='inactive'
    var sqli = "update `Trades` set `status` = '" + status + "' where `id` = '" + ide + "'";
    con.query(sqli, function (err, result) {
        ctx.editMessageReplyMarkup(
            {
                inline_keyboard: [
                    [{text: '🔺Max', callback_data: '🔺Max'}, {text: '🔻Min', callback_data: '🔻Min'}],
                    [{text: '📊Rate', callback_data: '📊Rate'}, {text: '📝Terms', callback_data: '📝Terms'}],
                    [{text: '❌Delete', callback_data: '❌Delete'}, {text: '💵Payment method', callback_data: '💵Payment method'}],
                    [{text: '🔆Turn on', callback_data: '🔆Turn on'}],


                ]
            },
        )


    })
})
/////turn on
bot.action('🔅Turn on',ctx=>{
    var ide = ctx.from.id
    var status='active'
    var sqli = "update `sells` set `status` = '" + status + "' where `id` = '" + ide + "'";
    con.query(sqli, function (err, result) {
        ctx.editMessageReplyMarkup(
            {
                inline_keyboard: [
                    [{text: '🔶Max', callback_data: '🔶Max'}, {text: '🔷Min', callback_data: '🔷Min'}],
                    [{text: '📉Rate', callback_data: '📉Rate'}, {text: '🗓Terms', callback_data: '🗓Terms'}],
                    [{text: '💢Delete', callback_data: '💢Delete'}, {
                        text: '🏦Payment method',
                        callback_data: '🏦Payment method'
                    }],
                    [{text: '📛Turn off', callback_data: '📛Turn off'}],


                ]
            },
        )


    })
})

//
bot.action('🔆Turn on',ctx=>{
    var ide = ctx.from.id
    var status='active'
    var sqli = "update `Trades` set `status` = '" + status + "' where `id` = '" + ide + "'";
    con.query(sqli, function (err, result) {
        ctx.editMessageReplyMarkup(
            {
                inline_keyboard: [
                    [{text: '🔺Max', callback_data: '🔺Max'}, {text: '🔻Min', callback_data: '🔻Min'}],
                    [{text: '📊Rate', callback_data: '📊Rate'}, {text: '📝Terms', callback_data: '📝Terms'}],
                    [{text: '❌Delete', callback_data: '❌Delete'}, {text: '💵Payment method', callback_data: '💵Payment method'}],
                    [{text: '🔴Turn off', callback_data: '🔴Turn off'}],


                ]
            },
        )


    })
})



























///////delete
bot.action('💢Delete',ctx=>{
var id=ctx.from.id
    var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
    con.query(sqli, function (err, result) {
      if (result.length===0){
          ctx.replyWithHTML('<b>🤷🏻‍♂️ You currently dont have an ad to delete</b>')
      }else {
          var sqla="DELETE FROM `sells` WHERE `Trades`.`id` = "+ id
          con.query(sqla,function (error,response) {
              ctx.replyWithHTML('<b>🚮 ad Deleted</b>')

          })

      }




    })



})


//delete trades
bot.action('❌Delete',ctx=>{
    var id=ctx.from.id
    var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `Trades` where `id` = '" + id + "'";
    con.query(sqli, function (err, result) {
        if (result.length===0){
            ctx.replyWithHTML('<b>🤷🏻‍♂️ You currently dont have an ad to delete</b>')
        }else {
            var sqla="DELETE FROM `Trades` WHERE `Trades`.`id` = "+ id
            con.query(sqla,function (error,response) {
                ctx.replyWithHTML('<b>🚮 ad Deleted</b>')

            })

        }




    })



})

////////////////////////////Balance
bot.hears('💳Balance',ctx => {
    var id = ctx.from.id
    var sql = "SELECT currency,trades,love,ratings,dislike,balance,total from `account` where `id` = '" + id + "'";
    con.query(sql,function (err,result) {
        client.getBuyPrice({'currencyPair': 'BTC-'+result[0].currency}, function (err, price) {
            ctx.replyWithHTML('<b>💳Balance</b>\nYour account balance and extra details\n\n💳Balance: <b>'+result[0].balance+' BTC</b>\n\n💲currency: <b>' + result[0].currency + '</b> \n🔺Buy price: <b>' + price.data.amount + ' usd</b>'+'\n🔂Trades: <b>'+result[0].trades+ '</b>\n 📈Total traded:<b>'+result[0].total+' BTC</b>\n\n⭐️Ratings: <b>'+result[0].ratings+'</b>\n👦Reviews: <b>('+result[0].love+')😁</b><b>('+result[0].dislike+')</b>😡'+'\n\n<i>select a payment method below👇🏻</i>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('📥Deposit', '📥Deposit'),
                    m.callbackButton('📤Withdraw', '📤Withdraw'),
                    m.callbackButton('👥Refferal', '👥Refferal'),
                    m.callbackButton('🌌My ads', '🌌My ads')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())

                })


        })
    })





})






















































































//test notification
bot.on('callback_query',ctx => {
    if (ctx.update.callback_query.data.split(/(\d+)/)[0]==='🔑Open deal ') {
        var id = ctx.update.callback_query.data.split('🔑Open deal')[1]
        var ide = ctx.from.id
        var sqli = "update `Trades` set `partner` = '" + id + "' where `id` = '" + ide + "'";
        con.query(sqli, function (err, result) {
            ctx.replyWithHTML('<b>how much BTC do you wish to sell eg 0.001</b>', Markup
                .keyboard([
                    ['⛔️Cancel'] // Row1 with 2 buttons

                ])
                .resize()
                .extra())
                .then(() => {
                    ctx.scene.enter('trade')

                        })
                })

    }else {
     ctx.replyWithHTML('nothing')
console.log(ctx.update.callback_query.data.split(/(\d+)/)[0])
    }
})










////////////////////////////////////
///
//  ADS KEYBOARD delete &&edit
//
/////////////////////////////






















bot.startPolling()



