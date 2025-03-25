const {Bookmark} = require('../models') 
class PrivateController {
    static async getMyBookmark(req, res, next) {
        try {
           let data = await Bookmark.findAll({
            where:{
                UserId: 1 //
            }
           })
           res.json(data[0].dataValues)
           console.log(data[0]);
        } catch (error) {
            next(error)
        }
    }

    static async addBookmark(req, res, next) {
        try {
            let {key} = req.query
            let userId = 1
            let data = await Bookmark.create({
                UserId: userId,
                key
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PrivateController;