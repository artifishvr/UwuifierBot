const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'meme',
            description: 'Classic top text bottom text meme generator',
            options: [
                {
                    name: 'tt',
                    type: CommandOptionType.STRING,
                    description: 'Top Text',
                    required: false
                },
                {
                    name: 'bt',
                    type: CommandOptionType.STRING,
                    description: 'Bottom Text',
                    required: false
                },
                {
                    name: 'image',
                    type: CommandOptionType.ATTACHMENT,
                    description: 'Image',
                    required: true
                },
            ]
        });
    }

    async run(ctx) {
        try {
            const tt = ctx.options.tt;
            const bt = ctx.options.bt;
            const image = ctx.options.image;

            await ctx.defer();

            fs.writeFileSync(path.resolve('./temp/uwuifyimage'), image); 

            sendMessage('convertedtext', ctx);
        } catch (error) {
            console.error(error);
        }
    }
};