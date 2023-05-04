const dotenv = require("dotenv");
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
  client.user.setActivity("hewwo", { // set bot activity
    type: ActivityType.Watching,
  });
  setInterval(() => { 
    client.user.setActivity("hewwo", { // set bot activity again later to fix discord weirdness
      type: ActivityType.Watching,
    });
  }, 3600000);

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
  .syncCommands();

client.login(process.env.DISCORD_CLIENT_TOKEN);
module.exports = {
  client,
  creator,
};