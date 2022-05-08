const dotenv = require("dotenv");
const path = require("path");
const { SlashCreator, GatewayServer } = require("slash-create");
const { Client } = require("discord.js");
const Statcord = require("statcord.js");

dotenv.config();

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

const statcord = new Statcord.Client({
  client,
  key: process.env.STATCORD_APIKEY,
  postCpuStatistics: false, 
    postMemStatistics: false, 
    postNetworkStatistics: false,
});

const creator = new SlashCreator({
    applicationID: process.env.DISCORD_CLIENT_ID,
    publicKey: process.env.DISCORD_CLIENT_PUBKEY,
    token: process.env.DISCORD_CLIENT_TOKEN,
    client
  });

client.on("ready", () => { // when bot client is ready 
  client.user.setActivity("-... --- -   ... - .- - ..- ...", { // set bot activity
    type: "WATCHING",
  });
  setInterval(() => { 
    client.user.setActivity("-... --- -   ... - .- - ..- ...", { // set bot activity again later to fix discord weirdness
      type: "WATCHING",
    });
  }, 3600000);

  console.log(`Logging in as ${client.user.tag}`);

  console.log("Ready!");

  statcord.autopost();
});

statcord.on("autopost-start", () => {
  // Emitted when statcord autopost starts
  console.log("Started Statcord Autopost");
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
  statcord,
};