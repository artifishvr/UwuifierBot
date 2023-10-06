const path = require("path");
const { SlashCreator, GatewayServer } = require("slash-create");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  allowedMentions: { parse: [] }
});


const creator = new SlashCreator({
  applicationID: process.env.DISCORD_CLIENT_ID,
  publicKey: process.env.DISCORD_CLIENT_PUBKEY,
  token: process.env.DISCORD_CLIENT_TOKEN,
  client
});

function updatePresence() {
  client.user.setActivity(":3", { // set bot activity
    type: ActivityType.Watching,
  });
}

client.on("ready", () => { // when bot client is ready 
  if (process.env.NODE_ENV != "production") { // if not in production
    client.user.setActivity("development", {
      type: ActivityType.Listening,
    });

    console.log("⚠️ Development mode!");

    console.log(`Logged in as ${client.user.tag}`);

    return;
  }
  console.log(`Logging in as ${client.user.tag}`);

  updatePresence();

  console.log("Ready!");

  setInterval(() => {
    updatePresence();
  }, 60000);
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