const { SlashCommand, CommandOptionType } = require('slash-create');
const { sendMessage } = require('../utils/sendmessage.js')
const fs = require('fs');
const path = require("path");
const Jimp = require("jimp");

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'caption',
            description: 'iFunny/EsmBot style caption generator',
            options: [
                {
                    name: 'caption',
                    type: CommandOptionType.STRING,
                    description: 'Top Text',
                    required: false
                },
                {
                    name: 'image',
                    type: CommandOptionType.ATTACHMENT,
                    description: 'Image',
                    required: true
                },
            ],

            guildIDs: ['807098274984493106']
        });
    }

    async run(ctx) {
        try {
            const cap = ctx.options.caption;
            const image = ctx.options.image;

            await ctx.defer();

            let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
            let jiiimpimage = await Jimp.read(image)

            jiiimpimage.print(font, 20, 20, cap)

            
            jiiimpimage.write('../temp/temp.png');

            ctx.sendFollowUp({ content:'brushjfr', file: '../temp/temp.png' });
        } catch (error) {
            console.error(error);
        }
    }
};