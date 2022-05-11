const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'hilih',
            description: 'Replaces vowels with Is',
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
        const convertedtext = replaceWord.hilih(text);

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Hilih", ctx.user.id);

        if (convertedtext.length <= 2000) { // if converted text is too long to send in discord
          ctx.sendFollowUp({ content: convertedtext }); // send converted text if it isn't too long
        } else {
          ctx.sendFollowUp({ content: "That text was too long to convert." }); // send error message if it is too long
        }
    } catch (error) {
        console.error(error);
    }}
};