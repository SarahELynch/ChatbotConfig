const envLoaded = require('dotenv').load({silent: true});
if(!envLoaded)
    console.log("warning:", __filename, "LINE_N", "Error: .env cannot be found");

const chalk = require('chalk');

const Bot = require('./bot');
const bot = new Bot();

let _context = {};

const stdin = process.openStdin();
stdin.on('data', (d) => {
  bot.message(d.toString().trim(), _context, 2);
});

bot.on('ready', () => {
  console.log("info: bot ready");
  bot.message('', {}, 2);
});

bot.on('receiveMessage', (message, context) => {
  _context = context;
  process.stdout.write(chalk.blue(message + "\n"));
});

bot.on('reportFound', (context, intents, entities) => {
  console.log("info: report found");
});

bot.on('addressFound', (loc) => {
  console.log("info: address found");
});

process.on('SIGINT', function() {
	console.log("info: SIGINT");
	process.exit();
});

process.on('SIGTERM', function() {
	console.log("info: SIGTERM");
	process.exit();
});

process.on('exit', function() {
	console.log("info: exit");
});
