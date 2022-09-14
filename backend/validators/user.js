const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const usernameRegex = /^([a-zA-Z0-9 _-]{1,12})$/;

module.exports = {
    emailRegex,
    validateEmail: (email) => {
        return emailRegex.test(email);
    },

    passwordRegex,
    validatePassword: (password) => {
        return passwordRegex.test(password);
    },

    usernameRegex,
    validateUserName: (pseudo) => {
        return usernameRegex.test(pseudo);
    },
};
