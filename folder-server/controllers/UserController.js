const {User} = require('../models')
class UserController {
    static async getAllUser(req, res, next) {
        try {
            let data = await User.findAll()
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async registerUser(req, res, next) {
        try {
            let {name, email, password} = req.body
            let data = await User.create({
                name, email, password
            })
            res.json(data)
          
        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController