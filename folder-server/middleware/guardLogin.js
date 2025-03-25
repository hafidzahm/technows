const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

async function guardLoginMiddleware(req, res, next) {
    try {
        console.log('guard login');
        let {authorization} = req.headers
        if (!authorization) {
            throw {name: 'Unauthorized', message: 'Invalid token'}
        }
    
        let codec = authorization.split(' ')
        if(codec[0] !== 'Bearer' || !codec[1]) {
            throw {name: 'Unauthorized', message: 'Invalid token'}
        }
    
        const token = verifyToken(codec[1])
        console.log(token);
        if(!token) {
            throw {name: 'Unauthorized', message: 'Invalid token'}
        }
        let user = await User.findByPk(token.id)
        console.log(user, 'Userrrrrr');
        if(!user) {
            throw {name: 'Unauthorized', message: 'Invalid token'}
        }
    
        req.user = {
            id: user.id
        }
        console.log(req.user);
        next()
    } catch (error) {
        next(error)
    }
   
}

module.exports = guardLoginMiddleware