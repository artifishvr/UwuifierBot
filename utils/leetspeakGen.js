function leetspeak(text) {
    const dictionary = {
        'a': '4',
        'b': '8',
        'c': '<',
        'd': '[)',
        'e': '3',
        'f': '|=',
        'g': '6',
        'h': '#',
        'i': '1',
        'j': '_|',
        'k': '|<',
        'l': '1',
        'm': '|v|',
        'n': '|\\|',
        'o': '0',
        'p': '|D',
        'q': '(,)',
        'r': '|2',
        's': '5',
        't': '7',
        'u': '|_|',
        'v': '\\/',
        'w': '\\/\\/',
        'x': '><',
        'y': '`/',
        'z': '2'
    };

    let result = '';
    for (let char of text.toLowerCase()) {
        result += dictionary[char] || char;
    }
    return result;
}

module.exports = { leetspeak };