const dotenv = require("dotenv");
const fs = require('fs');
const path = require("path");
const { SlashCreator, GatewayServer } = require("slash-create");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});


const creator = new SlashCreator({
  applicationID: process.env.DISCORD_CLIENT_ID,
  publicKey: process.env.DISCORD_CLIENT_PUBKEY,
  token: process.env.DISCORD_CLIENT_TOKEN,
  client
});

client.on("ready", () => { // when bot client is ready 

  if (!process.env.NODE_ENV) { // if not in production
    client.user.setActivity("development", {
      type: ActivityType.Listening,
    });
  }

  client.user.setActivity(":3", { // set bot activity
    type: ActivityType.Watching,
  });
  

  console.log(`Logging in as ${client.user.tag}`);

  console.log("Ready!");

});

creator
  .withServer(
    new GatewayServer(
      (handler) => client.ws.on('INTERACTION_CREATE', handler)
    )
  )
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .syncCommands({
    deleteCommands: true
  });

client.login(process.env.DISCORD_CLIENT_TOKEN);
module.exports = {
  client,
  creator,
};