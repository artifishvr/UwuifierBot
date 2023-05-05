const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'emojify',
            description: 'Emojifies text',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to Emojify',
                    required: true
                },
                {
                    name: 'density',
                    type: CommandOptionType.STRING,
                    description: 'The density of the emojis. Can be 1-100 (default: 100)',
                    required: false
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            var emojifiedtext = "";

            if (ctx.options.density) {
                if (ctx.options.density >= 100) { // if density is too high
                    ctx.sendFollowUp({ content: "Density can only be from 1-100" }); // send error message & exit
                    return;
                } else {
                    emojifiedtext = replaceWord.emojipasta(text, ctx.options.density); // emojify text with requested density
                }
            } else {
                emojifiedtext = replaceWord.emojipasta(text, 100); // emojify text with default density if none is specified
            }

            await ctx.defer();


            if (emojifiedtext.length <= 2000) { // if converted text is too long to send in discord
                ctx.sendFollowUp({ content: emojifiedtext });
            } else if (emojifiedtext.length <= 4000) { // yandere dev moment
                ctx.sendFollowUp({ content: emojifiedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: emojifiedtext.substring(2000, 4000) });
            } else if (emojifiedtext.length <= 6000) {
                ctx.sendFollowUp({ content: emojifiedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: emojifiedtext.substring(2000, 4000) });
                ctx.sendFollowUp({ content: emojifiedtext.substring(4000, 6000) });
            } else if (emojifiedtext.length <= 8000) {
                ctx.sendFollowUp({ content: emojifiedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: emojifiedtext.substring(2000, 4000) });
                ctx.sendFollowUp({ content: emojifiedtext.substring(4000, 6000) });
                ctx.sendFollowUp({ content: emojifiedtext.substring(6000, 8000) });
            } else {
                ctx.sendFollowUp({ content: "That text was too long to emojify." });
            }
        } catch (error) {
            console.error(error);
        }
    }
};