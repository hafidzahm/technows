const { compareHash } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");
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
}
module.exports = UserController;
