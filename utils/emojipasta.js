const emojiData = require("./emoji-data.json");

const commonWords = new Set([
    "a",
    "an",
    "as",
    "is",
    "if",
    "of",
    "the",
    "it",
    "its",
    "or",
    "are",
    "this",
    "with",
    "so",
    "to",
    "at",
    "was",
    "and",
]);

const inappropriateEmojis = [
    "🍆",
    "💦",
    "🍑",
    "🌮",
    "👅",
    "🐍",
    "🔯",
    "🖕",
    "🚬",
    "💣",
    "🔫",
    "🔪",
    "💊",
    "💉",
];

function emojipasta(input, d, s) {
    let __spreadArray =
        (this && this.__spreadArray) ||
        function (to, from, pack) {
            if (pack || arguments.length === 2)
                for (let i = 0, l = from.length, ar; i < l; i++) {
                    if (ar || !(i in from)) {
                        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                        ar[i] = from[i];
                    }
                }
            return to.concat(ar || Array.prototype.slice.call(from));
        };

    let isInappropriate = function (str) {
        return inappropriateEmojis.some(function (emoji) {
            return str.includes(emoji);
        });
    };

    let density = d;
    let shouldFilterEmojis = s;

    let words = input.replace(/\n/g, " ").split(" ");
    let result = words
        .reduce(function (acc, wordRaw) {
            let word = wordRaw.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
            let accNext = "".concat(acc, " ").concat(wordRaw);
            let randomChoice = Math.random() * 100 <= density;
            let isTooCommon = commonWords.has(word);
            let emojiFilter = shouldFilterEmojis
                ? function (option) {
                    return !isInappropriate(option);
                }
                : function () {
                    return true;
                };
            let emojiOptions = Object.entries(emojiData[word] || {})
                .filter(function (_a) {
                    let option = _a[0];
                    return emojiFilter(option);
                })
                .reduce(function (arr, _a) {
                    let option = _a[0],
                        frequency = _a[1];
                    return __spreadArray(
                        __spreadArray([], arr, true),
                        __spreadArray([], Array(frequency), true).fill(option),
                        true
                    );
                }, []);
            if (isTooCommon || !randomChoice || emojiOptions.length === 0) {
                return accNext;
            }
            let emojis =
                emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
            return "".concat(accNext, " ").concat(emojis);
        }, "")
        .trim();

    return result;
}

module.exports = {
    emojipasta
};