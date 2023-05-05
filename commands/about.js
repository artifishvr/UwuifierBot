const { SlashCommand } = require('slash-create');
const pjson = require('../package.json');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'about',
      description: 'About Uwuifier',

      guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
    });
  }

  async run(ctx) {

    const { client } = require('..');

    await ctx.defer();


    ctx.sendFollowUp({
      embeds: [
        {
          title: `Uwuifier `,
          description: `The discord bot to make your messages worse.`,
          color: 0xfafbfb,
          fields: [
            {
              name: `Version`,
              value: `${pjson.version}`,
              inline: true
            },
            {
              name: `GitHub`,
              value: `https://github.com/artificialbutter/Uwuifier`,
              inline: true
            },
            {
              name: `Server Count`,
              value: `${client.guilds.cache.size}`,
              inline: true
            }
          ],
          thumbnail: {
            "url": `https://github.com/artificialbutter/Uwuifier/raw/main/icon.png`,
            "height": 0,
            "width": 0
          },
          footer: {
            text: `Built by artificial`,
            icon_url: `https://avatars.githubusercontent.com/u/59352535?v=4`
          }
        }
      ]
    });
  }
};
