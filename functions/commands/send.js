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
  console.log(botToken)
  mongoose.connect(process.env.MONGO_URI, (err, db) => {
    MainBot.findOne({ token: botToken }, (err, mainBot) => {
      sendMessageToRegisteredWorkspace(mainBot.workspace, text).then(allMessagesToSend => {
        Promise.all(allMessagesToSend).then(res => {
          callback(null, {
            text: `You send message from: ${mainBot.workspace}`,
          });
        }).catch(err => {
          console.error(err);
        })
      });
    });
  });
};

const sendMessageToRegisteredWorkspace = (workspaceName, text) => {
  return new Promise((res, rej) => {
    ChildBot.find({mainWorkspace: workspaceName}, (err, childBots) => {
      let allMessagesToSend = [];

      childBots.map(child => {
        let callback = sendMessage(text, child.channel, child.token);
        allMessagesToSend.push(callback);
      });

      res(allMessagesToSend);
    });
  }); 
};

const sendMessage = (text, channel, token) => {
  return rp.post({
    uri: 'https://slack.com/api/chat.postMessage',
    form: {
      token: token,
      channel: channel,
      text: text,
      as_user: false,
      response_type: 'in_channel'
    }
  });
}
