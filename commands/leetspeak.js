const { SlashCommand, CommandOptionType } = require('slash-create');
const { leetspeak } = require('../utils/leetspeakGen.js');
const { sendMessage } = require('../utils/sendMessage.js')

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'leetspeak',
            description: 'Also known as 1337. Uses combinations of characters and symbols to rewrite letters with others graphically close.',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to Convert',
                    required: true
                }
            ]
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            let convertedtext = leetspeak(text);

            await ctx.defer();


            sendMessage(`${convertedtext}`, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};