const { SlashCommand, CommandOptionType } = require('slash-create');
const { sendMessage } = require('../utils/sendmessage.js')
const fs = require('fs');
const path = require("path");
const Jimp = require("jimp");

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'meme',
            description: 'Classic top text bottom text meme generator',
            options: [
                {
                    name: 'toptext',
                    type: CommandOptionType.STRING,
                    description: 'Top Text',
                    required: false
                },
                {
                    name: 'bottomtext',
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

            console.log(image);
            sendMessage('convertedtext', ctx);
        } catch (error) {
            console.error(error);
        }
    }
};