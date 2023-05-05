const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'clap',
            description: 'Adds👏claps👏to👏text',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to add claps to.',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            const convertedtext = replaceWord.clap(text);

            await ctx.defer();


            if (convertedtext.length <= 2000) { // if converted text is too long to send in discord
                ctx.sendFollowUp({ content: convertedtext });
            } else if (convertedtext.length <= 4000) { // yandere dev moment
                ctx.sendFollowUp({ content: convertedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: convertedtext.substring(2000, 4000) });
            } else if (convertedtext.length <= 6000) {
                ctx.sendFollowUp({ content: convertedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: convertedtext.substring(2000, 4000) });
                ctx.sendFollowUp({ content: convertedtext.substring(4000, 6000) });
            } else if (convertedtext.length <= 8000) {
                ctx.sendFollowUp({ content: convertedtext.substring(0, 2000) });
                ctx.sendFollowUp({ content: convertedtext.substring(2000, 4000) });
                ctx.sendFollowUp({ content: convertedtext.substring(4000, 6000) });
                ctx.sendFollowUp({ content: convertedtext.substring(6000, 8000) });
            } else {
                ctx.sendFollowUp({ content: "That text was too long to add claps to." });
            }
        } catch (error) {
            console.error(error);
        }
    }
};