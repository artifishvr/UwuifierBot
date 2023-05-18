const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');
const { sendMessage } = require('../utils/sendmessage.js')

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'morse',
            description: 'Converts text to morse code',
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
            const convertedtext = replaceWord.toMorse(text);

            await ctx.defer();


            sendMessage(convertedtext, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};