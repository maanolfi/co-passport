const User = require('./../../model/user')

module.exports = (req, res) => {
    res.render('users/new', { 
        user: new User()
    })
}