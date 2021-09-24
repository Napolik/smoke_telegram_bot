//Telegraf
const Telegraf = require('telegraf');
const { Router, Markup } = Telegraf;
const config = require('./config.json');
const bot = new Telegraf(config.token);
//MongoDB Atlas
const { MongoClient } = require("mongodb");                                                                                                                                       
const uri = "mongodb+srv://m2220user:<password>d@cluster0.dsjyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
 // The database to use
const dbName = "test";

bot.startPolling();
bot.start((ctx) => ctx.reply(`Привіт ${ctx.from.first_name}! Для реєстрації в боті напишіть команду: /reg`));


bot.hears('/reg', (ctx, next) => {
  bot.telegram.sendMessage(ctx.chat.id, 'Відправте будь-ласка Ваші контакти', requestPhoneKeyboard);
  insertTelegramProfile(ctx.from);
});


const inOutKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Вийти', 'out'),
  Markup.callbackButton('Зайти', 'in')
]).extra();

bot.on('message', (ctx) => ctx.telegram.sendMessage(
  ctx.from.id,
  'Що робимо?',
  inOutKeyboard)
);

function getDate() {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

function insertMove() {

}

bot.action('out', (ctx) => ctx.editMessageText('Ви вийшли в ' + getDate()));
bot.action('in', (ctx) => ctx.editMessageText('Ви зайшли в ' + getDate()));


const requestPhoneKeyboard = {
  "reply_markup": {
      "one_time_keyboard": true,
      "keyboard": [
          [{
              text: "Отправить контакты",
              request_contact: true,
              one_time_keyboard: true
          }],
          ["Отмена"]
      ]
  }
};

async function insertTelegramProfile(profile) {
  try {
       await client.connect();
       console.log("Connected correctly to server");
       const db = client.db(dbName);
       const col = db.collection("people");
       const p = await col.insertOne(profile);
      } catch (err) {
       console.log(err.stack);
   }
   finally {
      await client.close();
  }
};

bot.launch();