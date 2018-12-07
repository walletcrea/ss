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

//s







const {createServer} = require('http')
const server = createServer(() => {})
server.listen(process.env.PORT, '0.0.0.0');


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
            var currency='USD'
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
                    var currency='USD'
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
                            var refid = message.text.split(start)[1];
                            var friends=1;
                            var sql = "update `account` set `friends` =`friends`+ '" + friends + "' where `id` = '" + refid + "'"



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
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal ,if the refferal makes a trade you get 0.60% of his trade amount️')


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
            ctx.replyWithHTML('<b>💵Buy Bitcoin</b>\nBuy bitcoin from other sellers\n\n💲currency: <b>' + result[0].currency + '</b> \n🔺Buy price: <b>' + price.data.amount+'</b> <i>' +result[0].currency+'</i>'+'\n🔂Trades: <b>'+result[0].trades+ '</b>'+'\n\n⭐️Ratings: <b>'+result[0].ratings+'</b>\n👦Reviews: <b>('+result[0].love+')😁</b><b>('+result[0].dislike+')</b>😡'+'\n\n<i>select a payment method below👇🏻</i>',Extra
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
            ctx.replyWithHTML('<b>💰Sell Bitcoin</b>\n💰Sell bitcoin to other buyers\n\n💲currency: <b>' + result[0].currency + '</b> \n🔻sell price: <b>' + price.data.amount + '</b> <i>'+result[0].currency+'</i>'+'\n🔂Trades: <b>'+result[0].trades+ '</b>'+'\n\n⭐️Ratings: <b>'+result[0].ratings+'</b>\n👦Reviews: <b>('+result[0].love+')😁</b><b>('+result[0].dislike+')</b>😡'+'\n\n<i>select a payment method below👇🏻</i>',Extra
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







//////////////////buytradescene
const buytradescene = new Scene('buytrade')
buytradescene.hears('⛔️Cancel',(ctx => ctx.scene.leave()
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
buytradescene.on('message',ctx =>{
    if (isNaN(ctx.message.text)){
        ctx.reply('please provide a valid amount in btc')
    } else {
        var ide = ctx.from.id
        var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency from `sells` where `id` = '" + ide + "'";
        con.query(sql, function (err, results) {

            var ide = results[0].partner
            var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency from `sells` where `id` = '" + ide + "'";
            con.query(sql, function (err, result) {
                var rat = result[0].rate
                var rate = ctx.message.text * rat
                ctx.telegram.sendMessage(results[0].partner, '💵NEW TRADE\n\n ' + results[0].firstname + ' wishes to BUY <b>' + ctx.message.text + '</b> Bitcoins From you which equals  <b>' + Math.round(rate) + result[0].currency + '</b>  according to your rate', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('✅Release Bitcoins', '✅Release Bitcoins'),
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
                                ctx.scene.enter('buytrade2')
                            })
                    })


            })
        })
    }
})

//buy 2
const buytrade2scene = new Scene('trade2')
buytrade2scene.enter((ctx) => {
    var ide = ctx.from.id
    var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency from `sells` where `id` = '" + ide + "'";
    con.query(sql, function (err, results) {

        var id = results[0].partner
        var sql = "SELECT partner, paymentmethod,id,rate,min,max,firstname,currency,terms from `sells` where `id` = '" + id + "'";
        con.query(sql, function (err, result) {
            var rat = result[0].rate
            var rate = ctx.message.text * rat

            ctx.replyWithHTML('The seller has been notified\n\n According to the sellers rate you should pay him/her <b>' + rate + '</b><i>' + result[0].currency + '</i>\n\n<b>Terms of trade: </b> <i>'+result[0].terms+'</i>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('✅I have paid', '✅I have paid'),
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
//withdraw
const withdrawscene = new Scene('withdraw')
withdrawscene.enter((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT balance,withdrawadd,currency from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].withdrawadd == "none") {
            ctx.replyWithHTML('<b>withdraw address not set</b>\n\n<i>you can set your withdraw address in ⚙️Settings</i>')
            ctx.scene.leave()
        } else {
            var btc =results[0].balance
            var btcAmount, currency, rates;

            rates = require('bitcoin-exchange-rates');

            btcAmount = btc.toFixed(8);

            currency = results[0].currency;
            rates.fromBTC(btcAmount, currency, function (err, rate) {
                ctx.replyWithHTML('<b>🏦Withdraw funds</b>\n\nyour withdraw wallet: <b>' + results[0].withdrawadd + '</b>\n\nwithdraw funds to your wallet\n<b>Your balance ' + results[0].balance + ' Btc</b><i>('+rate+results[0].currency+')</i>\n\nCurrent withdraw fee: 0.0002')
                    .then(() => {
                        ctx.replyWithHTML('<i>Enter the number 0f BTC you would like to withdraw eg:(0.001)</i>', Markup
                            .keyboard([
                                ['🛑cancel'], // Row1 with 2 buttons
                            ])

                            .resize()
                            .extra())

                    })
            })
        }
    })
})
withdrawscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['💵Buy', '💰Sell'], // Row1 with 2 buttons
        ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
        ['✳️Post trade','⚙️Settings', '🌐About']
    ])

    .resize()
    .extra())
)
withdrawscene.hears('🛑cancel',(ctx => ctx.scene.leave()))
withdrawscene.on('message',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (isNaN(ctx.message.text)) {
            ctx.reply('please enter a valid amount')

        } else if (ctx.message.text <=0.0002) {
            ctx.replyWithHTML('Amount to withdraw has to be greater than <b>0.0002 BTC</b> due to the 0.0002 transaction fee')
            ctx.scene.leave()
        } else if (ctx.message.text > results[0].balance) {
            ctx.reply('your balance is not enough for the requsted withdrawal')
            ctx.scene.leave()
        } else {
            var id = ctx.from.id
            var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
            con.query(sql, function (error, results, fields) {
                var payout =ctx.message.text-0.0002
                var addre = results[0].withdrawadd
                client.getAccount(btc, function (err, account) {
                    account.sendMoney({
                        'to': addre,
                        'amount': payout,
                        'currency': 'BTC'
                    }, function (err, tx) {
                        var user = ctx.from.id
                        var amount = ctx.message.text
                        var sqli = "update `account` set `balance` = `balance`-" + amount + " where `id` = '" + user + "'";
                        con.query(sqli)
                        ctx.replyWithHTML('Your withdrawal of ' + payout + ' BTC is being processed', Markup
                            .keyboard([
                                ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                                ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                                ['✳️Post trade','⚙️Settings', '🌐About']
                            ])

                            .resize()
                            .extra())
                        ctx.scene.leave()
                    });
                });


            })
        }
    })
})
//withdraw add
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        ctx.replyWithHTML('send your BTC wallet address to be used for withdrwals below to update it\n\nCurrent withdraw address: <b>' + results[0].withdrawadd + '</b>', Markup
            .keyboard([
                ['🛑cancel'], // Row1 with 2 buttons
            ])

            .resize()
            .extra())

    })
})
greeterScene.hears('🛑cancel',ctx => {ctx.scene.leave()})

greeterScene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['💵Buy', '💰Sell'], // Row1 with 2 buttons
        ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
        ['✳️Post trade','⚙️Settings', '🌐About']
    ])

    .resize()
    .extra())
)
greeterScene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'BTC');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `withdrawadd` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                ['✳️Post trade','⚙️Settings', '🌐About']
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    } else {
        ctx.reply('invalid BTC address', Markup
            .keyboard([
                ['💵Buy', '💰Sell'], // Row1 with 2 buttons
                ['📥Deposit', '📤Withdraw','💳Balance'], // Row2 with 2 buttons
                ['✳️Post trade','⚙️Settings', '🌐About']
            ])

            .resize()
            .extra())

        ctx.scene.leave()
    }
})






























///////
const stage = new Stage([buyadscene,buytradescene,ratescene,withdrawscene,maxscene,maxsscene,greeterScene,ratesscene,selladscene,tradescene,trade2scene,termsscene,setmaxscene,setminscene,setpaymentscene,setratescene,setmaxsellscene,setminsellscene,setpaymentsellscene,setratesellscene,termsellscene], { ttl: 1800 })
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
bot.hears('📤Withdraw',enter('withdraw'))
bot.action('📤Withdraw',enter('withdraw'))
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
bot.hears('🔩Withdraw address',enter('greeter'))














//settings
bot.hears('⚙️Settings',ctx => {
    ctx.replyWithHTML('<b>update your preffered settings</b>',Markup
        .keyboard([
            ['🔩Withdraw address', '💲Currency'], // Row1 with 2 buttons
            ['🏠Menu']
        ])

        .resize()
        .extra())




})
//change currency
bot.hears('💲Currency',ctx => {
    var arr = ['AED', 'AFN', 'ALL','AMD','ANG', 'AOA','ARS','AUD','AWG','AZN' , 'BAM' , 'BBD', 'BDT', 'BGN', 'BHD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF' , 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK' , 'DJF', 'DKK' , 'DOP', 'DZD','EGP', 'ETB', 'EUR', 'FJD' , 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD' , 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JEP' , 'JMD', 'JOD', 'JPY', 'KES' , 'KGS', 'KHR', 'KMF', 'KPW' , 'KRW', 'KWD', 'KYD' , 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL' , 'LYD' , 'MAD' , 'MDL' , 'MGA' , 'MKD' , 'MMK' , 'MNT', 'MOP', 'MRO' , 'MUR' , 'MVR' , 'MWK', 'MXN', 'MYR', 'MZN' , 'NAD', 'NGN' , 'NIO' , 'NOK' , 'NPR' , 'NZD' , 'OMR', 'PAB', 'PEN' , 'PGK' , 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON' , 'RSD' , 'RUB' , 'RWF' , 'SAR', 'SBD' , 'SCR' , 'SDG' , 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SVC', 'SYP' , 'SZL' , 'THB' , 'TJS', 'TMT', 'TND', 'TOP' , 'TRY' , 'TTD' , 'TWD' , 'TZS' , 'UAH' , 'UGX' , 'USD', 'UYU', 'UZS' , 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR' , 'ZMK' , 'ZWL']
       ctx.reply('choose your currency',Extra
           .HTML()
           .markup((m) => m.inlineKeyboard([
               m.callbackButton(arr[0],arr[0]),
               m.callbackButton(arr[1],arr[1]),
               m.callbackButton(arr[2],arr[2]),
               m.callbackButton(arr[3],arr[3]),
               m.callbackButton(arr[4],arr[4]),
               m.callbackButton(arr[5],arr[5]),
               m.callbackButton(arr[6],arr[6]),
               m.callbackButton(arr[7],arr[7]),
               m.callbackButton(arr[8],arr[8]),
               m.callbackButton(arr[9],arr[9]),
               m.callbackButton(arr[10],arr[10]),
               m.callbackButton(arr[11],arr[11]),
               m.callbackButton(arr[12],arr[12]),
               m.callbackButton(arr[13],arr[13]),
               m.callbackButton(arr[14],arr[14]),
               m.callbackButton(arr[15],arr[15]),
               m.callbackButton(arr[16],arr[16]),
               m.callbackButton(arr[17],arr[17]),
               m.callbackButton(arr[18],arr[18]),
               m.callbackButton(arr[19],arr[19]),
               m.callbackButton(arr[20],arr[20]),
               m.callbackButton(arr[21],arr[21]),
               m.callbackButton(arr[22],arr[22]),
               m.callbackButton(arr[23],arr[23]),
               m.callbackButton(arr[24],arr[24]),
               m.callbackButton(arr[25],arr[25]),
               m.callbackButton(arr[26],arr[26]),
               m.callbackButton(arr[27],arr[27]),
               m.callbackButton(arr[28],arr[28]),
               m.callbackButton(arr[29],arr[29]),
               m.callbackButton(arr[30],arr[30]),
               m.callbackButton(arr[31],arr[31]),
               m.callbackButton(arr[32],arr[32]),
               m.callbackButton(arr[33],arr[33]),
               m.callbackButton(arr[34],arr[34]),
               m.callbackButton(arr[35],arr[35]),
               m.callbackButton(arr[36],arr[36]),
               m.callbackButton(arr[37],arr[37]),
               m.callbackButton(arr[38],arr[38]),
               m.callbackButton(arr[39],arr[39]),
               m.callbackButton(arr[40],arr[40]),
               m.callbackButton(arr[41],arr[41]),
               m.callbackButton(arr[42],arr[42]),
               m.callbackButton(arr[43],arr[43]),
               m.callbackButton(arr[44],arr[44]),
               m.callbackButton(arr[45],arr[45]),
               m.callbackButton(arr[46],arr[46]),
               m.callbackButton(arr[47],arr[47]),
               m.callbackButton(arr[48],arr[48]),
               m.callbackButton(arr[49],arr[49]),
               m.callbackButton(arr[50],arr[50]),
               m.callbackButton(arr[51],arr[51]),
               m.callbackButton(arr[52],arr[52]),
               m.callbackButton(arr[53],arr[53]),
               m.callbackButton(arr[54],arr[54]),
               m.callbackButton(arr[55],arr[55]),
               m.callbackButton(arr[56],arr[56]),
               m.callbackButton(arr[57],arr[57]),
               m.callbackButton(arr[58],arr[58]),
               m.callbackButton(arr[59],arr[59]),
               m.callbackButton(arr[60],arr[60]),
               m.callbackButton(arr[61],arr[61]),
               m.callbackButton(arr[62],arr[62]),
               m.callbackButton(arr[63],arr[63]),
               m.callbackButton(arr[64],arr[64]),
               m.callbackButton(arr[65],arr[65]),
               m.callbackButton(arr[66],arr[66]),
               m.callbackButton(arr[67],arr[67]),
               m.callbackButton(arr[68],arr[68]),
               m.callbackButton(arr[69],arr[69]),
               m.callbackButton(arr[70],arr[70]),
               m.callbackButton(arr[71],arr[71]),
               m.callbackButton(arr[72],arr[72]),
               m.callbackButton(arr[73],arr[73]),
               m.callbackButton(arr[74],arr[74]),
               m.callbackButton(arr[75],arr[75]),
               m.callbackButton(arr[76],arr[76]),
               m.callbackButton(arr[77],arr[77]),
               m.callbackButton(arr[78],arr[78]),
               m.callbackButton(arr[79],arr[79]),
               m.callbackButton(arr[80],arr[80]),
               m.callbackButton(arr[82],arr[82]),
               m.callbackButton(arr[83],arr[83]),
               m.callbackButton(arr[84],arr[84]),
               m.callbackButton(arr[85],arr[85]),
               m.callbackButton(arr[86],arr[86]),
               m.callbackButton(arr[87],arr[87]),
               m.callbackButton(arr[88],arr[88]),
               m.callbackButton(arr[89],arr[89]),
               m.callbackButton(arr[90],arr[90]),
               m.callbackButton(arr[91],arr[91]),
               m.callbackButton(arr[92],arr[92]),
               m.callbackButton(arr[93],arr[93]),
               m.callbackButton(arr[94],arr[94]),
               m.callbackButton(arr[95],arr[95]),
               m.callbackButton(arr[96],arr[96]),
               m.callbackButton(arr[97],arr[97]),
               m.callbackButton(arr[98],arr[98]),
               m.callbackButton(arr[99],arr[99]),
               m.callbackButton(arr[100],arr[100]),
               m.callbackButton(arr[101],arr[101]),
               m.callbackButton(arr[102],arr[102]),
               m.callbackButton(arr[103],arr[103]),
               m.callbackButton(arr[104],arr[104]),
               m.callbackButton(arr[105],arr[105]),
               m.callbackButton(arr[106],arr[106]),
               m.callbackButton(arr[107],arr[107]),
               m.callbackButton(arr[108],arr[108]),
               m.callbackButton(arr[109],arr[109]),
               m.callbackButton(arr[110],arr[110]),
               m.callbackButton(arr[111],arr[111]),
               m.callbackButton(arr[112],arr[112]),
               m.callbackButton(arr[113],arr[113]),
               m.callbackButton(arr[114],arr[114]),
               m.callbackButton(arr[115],arr[115]),
               m.callbackButton(arr[116],arr[116]),
               m.callbackButton(arr[117],arr[117]),
               m.callbackButton(arr[118],arr[118]),
               m.callbackButton(arr[119],arr[119]),
               m.callbackButton(arr[120],arr[120]),
               m.callbackButton(arr[121],arr[121]),
               m.callbackButton(arr[122],arr[122]),
               m.callbackButton(arr[123],arr[123]),
               m.callbackButton(arr[124],arr[124]),
               m.callbackButton(arr[125],arr[125]),
               m.callbackButton(arr[126],arr[126]),
               m.callbackButton(arr[127],arr[127]),
               m.callbackButton(arr[128],arr[128]),
               m.callbackButton(arr[129],arr[129]),
               m.callbackButton(arr[130],arr[130]),
               m.callbackButton(arr[131],arr[131]),
               m.callbackButton(arr[132],arr[132])

           ], {columns: 4})))
           .then(() => {
               ctx.reply('Choose your currency', Extra
                       .HTML()
                       .markup((m) => m.inlineKeyboard([
                           m.callbackButton(arr[133],arr[133]),
                           m.callbackButton(arr[134],arr[134]),
                           m.callbackButton(arr[135],arr[135]),
                           m.callbackButton(arr[136],arr[136]),
                           m.callbackButton(arr[137],arr[137]),
                           m.callbackButton(arr[138],arr[138]),
                           m.callbackButton(arr[139],arr[139]),
                           m.callbackButton(arr[140],arr[140]),
                           m.callbackButton(arr[141],arr[141]),
                           m.callbackButton(arr[142],arr[142]),
                           m.callbackButton(arr[143],arr[143]),
                           m.callbackButton(arr[144],arr[144]),
                           m.callbackButton(arr[145],arr[145]),
                           m.callbackButton(arr[146],arr[146]),
                           m.callbackButton(arr[147],arr[147]),
                           m.callbackButton(arr[148],arr[148]),
                           m.callbackButton(arr[149],arr[149]),
                           m.callbackButton(arr[150],arr[150]),
                           m.callbackButton(arr[151],arr[151]),
                           m.callbackButton(arr[152],arr[152]),
                           m.callbackButton(arr[153],arr[153]),
                           m.callbackButton(arr[154],arr[154]),
                           m.callbackButton(arr[155],arr[155]),
                           m.callbackButton(arr[156],arr[156])


                       ], {columns: 4})))
           })
})


/////////////refferal
bot.action('👥Refferal',ctx => {
ctx.replyWithHTML('Invite new users and get passive profit from bot\'s fees. Make your private exchange service! :dollar: \n' + '\n' + 'Your fee from volume:<b> 0.60%</b>\n' + '\n' + 'For example: if your affiliate user make a deal on <i>5 BTC</i>, you will get <i>0.03 BTC</i> of dividends. \n' + '\n' + 'Affiliate program is perpetual; it has no limits for invitations and begins to act immediately.\n' + '\n' + 'Keep in mind, for good results you should select right category of peoples who want to buy or sell BTC\n' + '\n' + 'Invite users via the link below.\nhttps://t.me/Escrowbitcoinbot?start='+ctx.from.id,Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('👥My Refferals', '👥My Refferals')
    ], { columns: 1 })))


})

//my refferals
bot.action('👥My Refferals',ctx=>{
    var id=ctx.from.id
    var sql = "SELECT friends from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        ctx.editMessageText('Invite new users and get passive profit from bot\'s fees. Make your private exchange service! :dollar: \n' + '\n' + 'Your fee from volume: <b>0.60%</b>\n' + '\n' + 'For example: if your affiliate user make a deal on 5 BTC, you will get 0.03 BTC of dividends. \n\n🔅Refferals: <b>' + results[0].friends + '</b>' ,Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👥Refferal', '👥Refferal')
            ], { columns: 1 })))

    })
})

///action depo
bot.action('📥Deposit',ctx => {
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


//my adds
bot.action('🌌My ads',ctx=>{
    ctx.replyWithHTML('<b>view your created ads</b>',Markup
        .keyboard([
            ['sell ads', 'buy ads'], // Row1 with 2 buttons
            ['🏠Menu']
        ])

        .resize()
        .extra())




})



//buyads
bot.hears('buy ads',ctx => {
    var id=ctx.from.id
    con.query("SELECT id,status FROM Trades WHERE id=" + id, function (err, result, fields) {
        if (result.length === 0) {
            ctx.reply('you currently dont have any ads')
        } else {
            var idee = ctx.from.id
            var sql = "SELECT status from `Trades` where `id` = '" + idee + "'";
            con.query(sql, function (err, res) {
                ctx.replyWithHTML('<b>📰Your Buying ad </b>')
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


                                    })
                            })
                        })
                    })
            })
        }
    })
})

//sell ads
bot.hears('sell ads',ctx => {
    var id=ctx.from.id
    con.query("SELECT id,status FROM sells WHERE id=" + id, function (err, result, fields) {
        if (result.length === 0) {
            ctx.reply('you currently dont have any ads')
        } else {
            var idee = ctx.from.id
            var sql = "SELECT status from `sells` where `id` = '" + idee + "'";
            con.query(sql, function (err, res) {
                ctx.replyWithHTML('<b>📰Your selling ad </b>')
                    .then(() => {
                        var id = ctx.from.id
                        var sql = "SELECT currency,id from `account` where `id` = '" + id + "'";
                        con.query(sql, function (error, results) {

                            var sqli = "SELECT rate,paymentmethod,min,max,status,terms from `sells` where `id` = '" + id + "'";
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


                                    })
                            })
                        })
                    })
            })
        }
    })
})


//about us
bot.hears('🌐About',ctx => {
ctx.reply('Bitcoin escrow is a Peer-to-peer exchanged bot. It allows users to buy or sell Bitcoin  directly to other users with alternative payment methods such as bank transfer, bank cash deposit, or mobile money.',Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
       m.urlButton('update channel','https://t.me/joinchat/AAAAAEzOyGgc41ShdnYFZQ'),
        m.urlButton('Support','https://t.me/steveyu')

    ], {columns: 1})))




})










































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
          var sqla="DELETE FROM `sells` WHERE `sells`.`id` = "+ id
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
    con.query(sql, function (err, result) {
        client.getBuyPrice({'currencyPair': 'BTC-' + result[0].currency}, function (err, price) {
            console.log()
            ctx.replyWithHTML('<b>💳Balance</b>\nYour account balance and extra details\n\n💳Balance: <b>' + result[0].balance + ' BTC</b>\n\n💲currency: <b>' + result[0].currency + '</b> \n🔺Buy price: <b>' + price.data.amount + '</b> <i>' + result[0].currency + '</i>' + '\n🔂Trades: <b>' + result[0].trades + '</b>\n 📈Total traded:<b>' + result[0].total + ' BTC</b>\n\n⭐️Ratings: <b>' + result[0].ratings + '</b>\n👦Reviews: <b>(' + result[0].love + ')😁</b><b>(' + result[0].dislike + ')</b>😡' + '\n\n<i>select a payment method below👇🏻</i>', Extra
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

                    //transactions
                    var user = ctx.from.id
                    var sql = "SELECT depoaddre,txid,ref,id from `account` where `id` = '" + user + "'";
                    con.query(sql, function (error, res, fields) {
                        if (res[0].depoaddre.length > 1) {
                            client.getAccount(btc, function (err, account) {
                                account.getAddress(res[0].depoaddre, function (err, address) {
                                    address.getTransactions({}, function (err, txs) {
                                        console.log(err)
                                        if (txs.length === 0) {
                                            console.log('no transactions today')
                                        } else if (txs[0].id == res[0].txid) {
                                            console.log('transaction already confirmed')
                                        } else if (txs[0].id !== res[0].txid&&txs[0].amount.amount>0.0002) {
                                            var txid = txs[0].id
                                            var balance = txs[0].amount.amount -0.0002
                                            var chatid = ctx.from.id
                                            var sqli = "update `account` set `txid` = '" + txid + "', balance = `balance`+" + balance + " where `id` = '" + chatid + "'";
                                            con.query(sqli, function (err, response) {
                                                console.log(err)
                                                ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + balance + '\n\n 0.0002 BTC transaction fee has been deducted')
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
        })
    })
})





















































































//test notification
bot.on('callback_query',ctx => {
    if (ctx.update.callback_query.data.split('🔑Open deal')[1]||ctx.update.callback_query.data.split('💵Open deal ')[1]==ctx.from.id) {
        ctx.reply('you cant trade with yourself 🤷🏻‍♂️')
    }else if (ctx.update.callback_query.data.split(/(\d+)/)[0]==='🔑Open deal ') {

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

    }else if (ctx.update.callback_query.data.split(/(\d+)/)[0]==='💵Open deal '){
        console.log(ctx.update.callback_query.data.split(/(\d+)/)[0])
        var ida = ctx.update.callback_query.data.split('💵Open deal ')[1]
        var ided=ctx.from.id
        var sqlaa = "update `sells` set `partner` = '" + ida + "' where `id` = '" + ided + "'";
        con.query(sqlaa, function (err, result) {
            console.log(err)
            ctx.replyWithHTML('<b>how much BTC do you wish to Buy eg 0.001</b>', Markup
                .keyboard([
                    ['⛔️Cancel'] // Row1 with 2 buttons

                ])
                .resize()
                .extra())
                .then(() => {
                    ctx.scene.enter('buytrade')

                })

        })
    }
    else {
        var idee= ctx.from.id
        var currency=ctx.update.callback_query.data
        var sqla = "update `account`,`sells`,`Trades` set `account`.`currency` = '" + currency + "', `Trades`.`currency` = '" + currency + "', `sells`.`currency` ='" + currency + "' where `account`.`id` = " + idee
        con.query(sqla,function (err,res) {
            console.log(err)
            ctx.replyWithHTML('Currency updated to <b>'+currency+'</b>')
            console.log(ctx.update.callback_query.data.split(/(\d+)/)[0])


        })



    }
})










////////////////////////////////////
///
//  ADS KEYBOARD delete &&edit
//
/////////////////////////////
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})





















bot.startPolling()



