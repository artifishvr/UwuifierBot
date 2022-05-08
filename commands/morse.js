const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'morsecode',
            description: 'Converts text to morse code',
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
        const convertedtext = replaceWord.toMorse(text);

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Morse", ctx.user.id);

        if (convertedtext.length <= 2000) {
          ctx.sendFollowUp({ content: convertedtext });
        } else {
          ctx.sendFollowUp({ content: "That text was too long to convert." });
        }
    } catch (error) {
        console.error(error);
    }}
};