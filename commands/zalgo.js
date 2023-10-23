const { SlashCommand, CommandOptionType } = require('slash-create');
const { zalgoRandomGeneration } = require('../utils/zalgoGen.js');
const { sendMessage } = require('../utils/sendMessage.js')

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'zalgo',
            description: 'Adds zalgo to text',
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
            let convertedtext = zalgoRandomGeneration(text, 6);

            await ctx.defer();


            sendMessage(`${convertedtext}`, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};