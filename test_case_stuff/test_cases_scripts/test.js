const envLoaded = require('dotenv').load({silent: true});
if(!envLoaded)
      console.log("warning:", __filename, "LINE_N", "Error: .env cannot be found");

const fs = require('fs');
const chalk = require('chalk');

const testlib = require('./testlib');
const Bot = require('./bot');
const bot = new Bot();

const handleResults = (fails) => {
  if(fails.length == 0) {
    console.log("*****COMPLETE******");
  } else {
    console.log("*****COMPLETE****** these tests failed:");
    console.log(fails);
    for(let fail of fails) {
      if (fail.active) process.exit(1);
    }
  }
};

bot.on('ready', () => {
  if(process.argv.length == 2) {
    fs.readdir('./test_cases', function(err, items) {
      testlib.test(bot, items.map(item => './test_cases/' + item), 1, handleResults);
    });
  } else {
    try {
      testlib.test(bot, ['./test_cases/' + process.argv[2]], 1, handleResults);
    } catch (e) {
      console.log(e);
    }
  }
});
