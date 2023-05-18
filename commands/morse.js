const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');
const fs = require('fs');
const path = require("path");
const SnowflakeCodon = require("snowflake-codon");

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
            const generator = new SnowflakeCodon(1, 99, 2021, 200);

            await ctx.defer();


            if (convertedtext.length > 2000) { // if converted text is too long to send in discord
                var snowflakeid = generator.nextId();

                fs.writeFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'), convertedtext); // write to file

                ctx.sendFollowUp({
                    content: "", file: {
                        name: 'uwuify-' + snowflakeid + '.txt',
                        file: fs.readFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'))
                    }
                });
                fs.unlinkSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt')); // delete file
                return;
            }

            ctx.sendFollowUp({ content: convertedtext });
        } catch (error) {
            console.error(error);
        }
    }
};