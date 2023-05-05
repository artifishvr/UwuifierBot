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
                },
                {
                    name: 'words',
                    type: CommandOptionType.BOOLEAN,
                    description: 'Add uwu words?',
                    required: false
                },
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {
        try {
            const uwuifier = new Uwuifier(); // create new uwuifier instance
            const text = ctx.options.text;
            var uwuifiedtext = uwuifier.uwuifyWords(text);

            await ctx.defer();

            if (ctx.options.words == true) {
                uwuifiedtext = uwuifier.uwuifySentence(text);
            };


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