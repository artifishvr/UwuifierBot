const { SlashCommand, CommandOptionType } = require('slash-create');
const { Uwuifier } = require('@patarapolw/uwuifier');
const fs = require('fs');
const path = require("path");
const SnowflakeCodon = require("snowflake-codon");

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
                    description: 'Replaces exclamations with more \"expressive\" exclamations',
                    required: false
                },
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {
        try {
            const uwuifier = new Uwuifier(); // create new uwuifier instance
            const generator = new SnowflakeCodon(1, 99, 2021, 200);
            const text = ctx.options.text;
            var uwuifiedtext = uwuifier.uwuifyWords(text);


            await ctx.defer();

            if (ctx.options.words == true) {
                uwuifiedtext = uwuifier.uwuifySpaces(uwuifiedtext); 
            };

            if (ctx.options.exclamations == true) {
                uwuifiedtext = uwuifier.uwuifyExclamations(uwuifiedtext); // it's quite shrimple
            };


            if (uwuifiedtext.length > 2000) { // if converted text is too long to send in discord
                var snowflakeid = generator.nextId();

                fs.writeFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'), uwuifiedtext); // write to file

                ctx.sendFollowUp({
                    content: "", file: {
                        name: 'uwuify-' + snowflakeid + '.txt',
                        file: fs.readFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'))
                    }
                });
                fs.unlinkSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt')); // delete file
                return;
            } // :3


            ctx.sendFollowUp({ content: uwuifiedtext });

        } catch (error) {
            console.error(error);
        }
    }
};