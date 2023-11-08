const { SlashCommand, CommandOptionType } = require('slash-create');
const { sendMessage } = require('../utils/sendMessage.js')

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'reverse',
            description: 'Reverses text. Run it twice to get the original text back!',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to Reverse',
                    required: true
                }
            ]
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            let convertedtext = text.split('').reverse().join('');

            await ctx.defer();

            sendMessage(`${convertedtext}`, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};