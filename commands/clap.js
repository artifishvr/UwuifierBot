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
                    description: 'Text to Convert',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {
    try {
        const text = ctx.options.text;
        const convertedtext = replaceWord.clap(text);

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Clap", ctx.user.id);

        if (convertedtext.length <= 2000) { // if converted text is too long to send in discord
          ctx.sendFollowUp({ content: convertedtext }); // send converted text if it isn't too long
        } else {
          ctx.sendFollowUp({ content: "That text was too long to convert." }); // send error message if it is too long
        }
    } catch (error) {
        console.error(error);
    }}
};