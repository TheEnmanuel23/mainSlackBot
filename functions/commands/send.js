const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const mongoose = require('mongoose');
const rp = require('request-promise');
const MainBot = require('../../db/models/MainBot');
const ChildBot = require('../../db/models/ChildBot');
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
    rp.post({
      uri: 'https://slack.com/api/chat.postMessage',
      form: {
        token: 'xoxb-422439424144-424671930310-VbvpPNDbqRZ6r21TJrf7Btt7',
        channel: 'general',
        text: text,
        as_user: false,
        response_type: 'in_channel'
      }
    })
    .then(res => {
      callback(null, {
        text: `Great! You have an added workspace, now you can link ${text} to other workspaces and send messages.`,
      });
    }).catch(err => {
      console.error(err)
    })
  });
};
