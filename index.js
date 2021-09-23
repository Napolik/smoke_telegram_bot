const Telegraf = require('telegraf')
const config = require('./config.json')

const bot = new Telegraf(config.token)
 
bot.startPolling()
bot.start((ctx) => ctx.reply(`Привіт ${ctx.from.first_name}! Для реєстрації в боті напишіть команду: /reg`))


bot.hears('/reg', (ctx, next) => {
  let profile = ctx.from;
  console.log(profile);
  bot.telegram.sendMessage(ctx.chat.id, 'Відправте будь-ласка Ваші контакти', requestPhoneKeyboard);
})

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


bot.launch()