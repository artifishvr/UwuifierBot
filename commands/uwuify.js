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
        const uwuifier = new Uwuifier(); // create new uwuifier instance
        const text = ctx.options.text;
        const uwuifiedtext = uwuifier.uwuifySentence(text);

        await ctx.defer();
         

        if (uwuifiedtext.length <= 2000) { // if uwuified text is too long to send in discord
          ctx.sendFollowUp({ content: uwuifiedtext }); // send uwuified text if it isn't too long
        } else {
          ctx.sendFollowUp({ content: "That text was too long to uwuify." }); // send error message if it is too long
        }
    } catch (error) {
        console.error(error);
    }}
};