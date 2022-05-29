const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'about',
            description: 'About TextFun',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("About", ctx.user.id);

        ctx.sendFollowUp({
            embeds: [
                {
                  title: `TextFun `,
                  description: `The discord bot to make your messages worse.`,
                  color: 0xfafbfb,
                  fields: [
                    {
                      name: `Status Page`,
                      value: `https://status.artificialbutter.ml`,
                      inline: true
                    },
                    {
                      name: `GitHub`,
                      value: `https://github.com/artificialbutter/TextFun`,
                      inline: true
                    },
                    {
                      name: `Server Count`,
                      value: `${client.guilds.cache.size}`,
                      inline: true
                    }
                  ],
                  thumbnail: {
                    "url": `https://github.com/artificialbutter/TextFun/raw/main/icon.png`,
                    "height": 0,
                    "width": 0
                  },
                  footer: {
                    text: `Coded by ArtificialButter`,
                    icon_url: `https://avatars.githubusercontent.com/u/59352535?v=4`
                  }
                }
              ]
            });
    }
};
