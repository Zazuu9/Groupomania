const wordRegex = /[a-zA-Z\d\W]{1,}/;

module.exports = {
    wordRegex,

    validateMesssage: (message) => {
        return wordRegex.test(message)
    }
};