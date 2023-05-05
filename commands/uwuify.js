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
                    description: 'Add uwu words?',
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
                uwuifiedtext = uwuifier.uwuifySentence(text);
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
            }

            ctx.sendFollowUp({ content: uwuifiedtext });

        } catch (error) {
            console.error(error);
        }
    }
};