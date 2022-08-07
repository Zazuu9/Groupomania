const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

module.exports = {
    emailRegex, 
    valideEmail: (email) => {
        return emailRegex.test(email)
    },

    passwordRegex,
    validatePassword: (password) => {
        return password.test(password)
    }
};