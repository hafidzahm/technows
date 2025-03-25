const {Bookmark} = require('../models') 
class PrivateController {
    static async getMyBookmark(req, res, next) {
        try {
           
           let data = await Bookmark.findAll({
            where:{
                UserId: 1 //
            }
           })
           data = data.map(el => el.dataValues)
           res.json(data)
           console.log(data);
           console.log('Semua booknark user');
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

    static async deleteBookmark(req, res, next) {
        try {
            let {bookmarkId} = req.params
            let data = await Bookmark.findByPk(+bookmarkId)
            if (!data) {
                throw {name: 'NotFound', message: 'Bookmark not found'}
            }
            await data.destroy()

            res.json({message: 'Bookmark success deleted.'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PrivateController;