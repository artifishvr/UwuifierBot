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
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {
    try {
        const text = ctx.options.text;
        const emojifiedtext = replaceWord.emojipasta(text);

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Emojify", ctx.user.id);

        if (emojifiedtext.length <= 2000) {
          ctx.sendFollowUp({ content: emojifiedtext });
        } else {
          ctx.sendFollowUp({ content: "That text was too long to emojify." });
        }
    } catch (error) {
        console.error(error);
    }}
};