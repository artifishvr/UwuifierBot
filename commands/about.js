const { SlashCommand } = require('slash-create');
const pjson = require('../package.json');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'about',
      description: 'About Uwuifier',
    });
  }

  async run(ctx) {

    const { client } = require('..');

    await ctx.defer();


    ctx.sendFollowUp({
      embeds: [
        {
          title: `UwUifier`,
          description: `The discord bot to make your messages worse.`,
          color: 0xfafbfb,
          fields: [
            {
              name: `Version`,
              value: `${pjson.version}`,
              inline: true
            },
            {
              name: `Server Count`,
              value: `${client.guilds.cache.size}`,
              inline: true
            },
            {
              name: `GitHub`,
              value: `${pjson.repository}`,
              inline: false
            },
            {
              name: `Support Server`,
              value: `https://discord.gg/83x5Ans2bF`,
              inline: false
            }
          ],
          thumbnail: {
            "url": `https://github.com/artificialbutter/Uwuifier/raw/main/icon.png`,
            "height": 0,
            "width": 0
          },
          footer: {
            text: `Built with ❤️ by @artifish`,
            icon_url: `https://cdn.discordapp.com/avatars/532053122017787924/a4e2c53d286c52a09a088c439522777e.png`
          }
        }
      ]
    });
  }
};
