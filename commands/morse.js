const { SlashCommand, CommandOptionType } = require('slash-create');
const { toMorse, fromMorse } = require('../utils/toMorse.js');
const { sendMessage } = require('../utils/sendMessage.js')

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
                },
                {
                    name: 'reverse',
                    type: CommandOptionType.BOOLEAN,
                    description: 'Turn morse code back into text',
                    required: false
                }
            ]
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            let convertedtext = toMorse(text);
            if (ctx.options.reverse) {
                convertedtext = fromMorse(text);
            }

            await ctx.defer();


            sendMessage(` \`${convertedtext}\` `, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};