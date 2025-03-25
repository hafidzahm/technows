const {Bookmark} = require('../models')
async function authorizationMiddleware(req, res, next) {
    try {
        let {id} = req.user
        let {bookmarkId} = req.params

        let bookmark = await Bookmark.findByPk(bookmarkId)
        if(!bookmark) {
            throw {name: 'NotFound', message: 'Bookmark not found'}
        }

        console.log(bookmark, '<--------authorization');
        console.log(bookmark.UserId, '<--------bookmarkUserId');
        console.log(id, '<--------loginUserId');

        if(bookmark.UserId !== id) {
            throw {name: 'Unauthorized', message: 'You are not authorized'}
        }
        next()
    } catch (error) {
        next(error)
        
    }
}module.exports = authorizationMiddleware