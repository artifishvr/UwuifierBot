const { SlashCommand, CommandOptionType } = require('slash-create');
const { sendMessage } = require('../utils/sendmessage.js')

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
            ]
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            const convertedtext = text.replace(/ /g, "👏");

            await ctx.defer();


            sendMessage(convertedtext, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};