const { SlashCommand, CommandOptionType } = require('slash-create');
const { Uwuifier } = require('@patarapolw/uwuifier');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'uwuifywords',
            description: 'Just uwuifies words (turns something like hello world into hewwo worwld)',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to Uwuify',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {
        try {
            const uwuifier = new Uwuifier(); // create new uwuifier instance
            const text = ctx.options.text;
            const uwuifiedtext = uwuifier.uwuifyWords(text);

            await ctx.defer();


            if (uwuifiedtext.length <= 2000) { // if uwuified text is too long to send in discord
                ctx.sendFollowUp({ content: uwuifiedtext });
            } else if (uwuifiedtext.length <= 4000) { // yandere dev moment
                ctx.sendFollowUp({ content: uwuifiedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: uwuifiedtext.substring(2000, 4000) });
            } else if (uwuifiedtext.length <= 6000) {
                ctx.sendFollowUp({ content: uwuifiedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: uwuifiedtext.substring(2000, 4000) });
                ctx.sendFollowUp({ content: uwuifiedtext.substring(4000, 6000) });
            } else if (uwuifiedtext.length <= 8000) {
                ctx.sendFollowUp({ content: uwuifiedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: uwuifiedtext.substring(2000, 4000) });
                ctx.sendFollowUp({ content: uwuifiedtext.substring(4000, 6000) });
                ctx.sendFollowUp({ content: uwuifiedtext.substring(6000, 8000) });
            } else {
                ctx.sendFollowUp({ content: "That text was too long to uwuify." });
            }
        } catch (error) {
            console.error(error);
        }
    }
};