function randomFace() {
    const faces = [":3", "uwu", "owo", "^.^", "^-^", ">w<"];
    const randomIndex = Math.floor(Math.random() * faces.length);
    return faces[randomIndex];
}

function insertRandomFaces(inputString, probability) {
    const words = inputString.split(/\s+/);
    const outputWords = words.map((word) => {
        if (Math.random() < probability) {
            return word + " " + randomFace();
        }
        return word;
    });
    return outputWords.join(" ");
}

module.exports = { insertRandomFaces }