const { SlashCommand, CommandOptionType } = require('slash-create');
const replaceWord = require('replace-word');
const fs = require('fs');
const path = require("path");
const SnowflakeCodon = require("snowflake-codon");

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
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {
        try {
            const text = ctx.options.text;
            var emojifiedtext = replaceWord.emojipasta(text, 100);
            const generator = new SnowflakeCodon(1, 99, 2021, 200);          

            await ctx.defer();

            if (ctx.options.density) {
                if (ctx.options.density > 100 || ctx.options.density < 1) { return ctx.sendFollowUp({ content: "Density can only be from 1-100" }); };
                
                emojifiedtext = replaceWord.emojipasta(text, ctx.options.density);
            };

            if (emojifiedtext.length > 2000) { // if converted text is too long to send in discord
                var snowflakeid = generator.nextId();

                fs.writeFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'), emojifiedtext); // write to file

                ctx.sendFollowUp({
                    content: "", file: {
                        name: 'uwuify-' + snowflakeid + '.txt',
                        file: fs.readFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'))
                    }
                });
                fs.unlinkSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt')); // delete file
                return;
            }

            ctx.sendFollowUp({ content: emojifiedtext });
        } catch (error) {
            console.error(error);
        }
    }
};