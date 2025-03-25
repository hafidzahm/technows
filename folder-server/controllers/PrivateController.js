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
}

module.exports = PrivateController;