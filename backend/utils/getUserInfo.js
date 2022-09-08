const User = require('../models/User')

exports.GetUserInfo = async (UserId) => {
    return await User.findOne({_id: UserId})

}