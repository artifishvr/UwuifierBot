const { SlashCommand, CommandOptionType } = require('slash-create');
const { Uwuifier } = require('@patarapolw/uwuifier');
const { sendMessage } = require('../utils/sendmessage.js')

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
                },
                {
                    name: 'words',
                    type: CommandOptionType.BOOLEAN,
                    description: 'Adds random s-s-stutters to certain words, adds actions and random faces in between words.',
                    required: false
                },
                {
                    name: 'exclamations',
                    type: CommandOptionType.BOOLEAN,
                    description: 'Replaces exclamations with more "expressive" exclamations',
                    required: false
                },
            ]
        });
    }

    async run(ctx) {
        try {
            const uwuifier = new Uwuifier(); // create new uwuifier instance
            const text = ctx.options.text;
            let uwuifiedtext = uwuifier.uwuifyWords(text);


            await ctx.defer();

            if (ctx.options.words) {
                uwuifiedtext = uwuifier.uwuifySpaces(uwuifiedtext);
            };

            if (ctx.options.exclamations) {
                uwuifiedtext = uwuifier.uwuifyExclamations(uwuifiedtext); // it's quite shrimple
            };

            sendMessage(uwuifiedtext, ctx);
        } catch (error) {
            console.error(error);
        }
    }
};