const wordRegex = /[a-zA-Z\d\W]{2,}/;

module.exports = {
    wordRegex,

    validateMesssage: (message) => {
        return wordRegex.test(message)
    }
};