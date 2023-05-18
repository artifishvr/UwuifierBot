const fs = require('fs');
const path = require("path");
const SnowflakeCodon = require("snowflake-codon");

function sendMessage(uwuifiedtext, ctx) {
    try {
        const generator = new SnowflakeCodon(1, 99, 2021, 200);


        if (uwuifiedtext.length > 2000) {
            var snowflakeid = generator.nextId();

            fs.writeFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'), uwuifiedtext); 

            ctx.sendFollowUp({
                content: "", file: {
                    name: 'uwuify-' + snowflakeid + '.txt',
                    file: fs.readFileSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt'))
                }
            });
            fs.unlinkSync(path.resolve('./temp/uwuify-' + snowflakeid + '.txt')); 
            return;
        } // :3

        ctx.sendFollowUp({ content: uwuifiedtext });

    } catch (error) {
        console.error(error);
    }

}
module.exports = { sendMessage }