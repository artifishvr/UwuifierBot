const { SlashCommand, CommandOptionType } = require('slash-create');
const { Uwuifier } = require('@patarapolw/uwuifier');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'uwuify',
            description: 'Uwuifies text',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to Uwuify',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {
    try {
        const uwuifier = new Uwuifier();
        const text = ctx.options.text;
        const uwuifiedtext = uwuifier.uwuifySentence(text);

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Uwuify", ctx.user.id);

        if (uwuifiedtext.length <= 2000) {
          ctx.sendFollowUp({ content: uwuifiedtext });
        } else {
          ctx.sendFollowUp({ content: "That text was too long to uwuify." });
        }
    } catch (error) {
        console.error(error);
    }}
};