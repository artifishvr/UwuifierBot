const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');
const { sendMessage } = require('../utils/sendmessage.js')

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
                },
                {
                    name: 'density',
                    type: CommandOptionType.STRING,
                    description: 'The density of the emojis. Can be 1-100 (default: 100)',
                    required: false
                }
            ]
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            let emojifiedtext = replaceWord.emojipasta(text, 100);

            await ctx.defer();

            if (ctx.options.density) {
                if (ctx.options.density > 100 || ctx.options.density < 1) { return ctx.sendFollowUp({ content: "Density can only be from 1-100", ephemeral: true }); };

                emojifiedtext = replaceWord.emojipasta(text, ctx.options.density);
            };

            sendMessage(emojifiedtext, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};