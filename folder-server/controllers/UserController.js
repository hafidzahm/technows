const { compareHash } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");
const {OAuth2Client} = require('google-auth-library');
class UserController {
  // static async getAllUser(req, res, next) {
  //   try {
  //     let data = await User.findAll();
  //     res.json(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  static async registerUser(req, res, next) {
    try {
      let { name, email, password } = req.body;
      let data = await User.create({
        name,
        email,
        password,
      });
      data = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      console.log(req.body);
      if (!email) {
        throw { name: "NotEmpty", message: "Email is required" };
      }
      if (!password) {
        throw { name: "NotEmpty", message: "Password is required" };
      }
      let data = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!data) {
        throw {
          name: "UnregisteredEmail",
          message: "Invalid email or password",
        };
      }

      let compare = compareHash(password, data.password);
      if(!compare) {
        throw {name: 'InvalidPassword', message: 'Invalid email or password'}
      }

      let access_token = createToken({
        id: data.id,
        email: data.email,
      })
      res.status(200).json({access_token})
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const {googleToken} = req.body
      console.log(googleToken, '<<< tokengoogle');
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_API,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload, '<<< payload');
    const userid = payload['sub'];
    const [user] = await User.findOrCreate({
      where: {
        email: payload.email
      },
      defaults: {
        name: payload.name,
        email: payload.email,
        password: `${Math.random()} + ${Date.now()}`
      }
    })

    let access_token = createToken({
      id: user.id,
      email: user.email,
    })
    // If the request specified a Google Workspace domain:
    // const domain = payload['hd'];
      res.json({access_token})
    } catch (error) {
      next(error);
      
    }
  }
}
module.exports = UserController;
