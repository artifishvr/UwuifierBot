const { SlashCommand, CommandOptionType } = require('slash-create');
const { sendMessage } = require('../utils/sendMessage.js')
const { insertRandomFaces } = require('../utils/randomFaces.js');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'faces',
            description: 'Adds completely random uwu faces to text',
            options: [
                {
                    name: 'text',
                    type: CommandOptionType.STRING,
                    description: 'Text to add faces to.',
                    required: true
                }
            ]
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;

            await ctx.defer();

            const convertedtext = insertRandomFaces(text, 0.5);

            sendMessage(convertedtext, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};