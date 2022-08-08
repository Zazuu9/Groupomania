const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

module.exports = {
    emailRegex, 
    validateEmail: (email) => {
        return emailRegex.test(email)
    },

    passwordRegex,
    validatePassword: (password) => {
        return passwordRegex.test(password)
    }
};