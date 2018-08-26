const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const mongoose = require('mongoose');
const MainBot = require('../../db/models/MainBot');
/**
* /config
*
*   Save the main app
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  mongoose.connect(process.env.MONGO_URI, (err, db) => {
    const mainBotToSave = new MainBot({workspace: text, token: botToken});
    
    mainBotToSave.save((err) => {
      if (err) return console.log(err);

      callback(null, {
        text: `Great! You have an added workspace, now you can link ${text} to other workspaces and send messages.`,
      });
    });
  });
};
