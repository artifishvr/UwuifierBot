const SnowflakeCodon = require("snowflake-codon");

function sendMessage(uwuifiedtext, ctx) {
    try {
        const generator = new SnowflakeCodon(1, 99, 2021, 200);


        if (uwuifiedtext.length > 2000) {
            var snowflakeid = generator.nextId();

            var uwuifiedbuffer = Buffer.from(uwuifiedtext);

            ctx.sendFollowUp({
                content: "", file: {
                    name: 'uwuify-' + snowflakeid + '.txt',
                    file: uwuifiedbuffer
                }
            });
            return;
        } // :3

        ctx.sendFollowUp({ content: uwuifiedtext });

    } catch (error) {
        console.error(error);
    }

}
module.exports = { sendMessage }