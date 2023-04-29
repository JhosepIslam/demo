const User = require('../models/user');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');

  const getUsers = (req, res) => {

    //get all users from database
    User.find().then(users => {
      res.json({
        ok: true,
        users
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        err
      });
    });
    
  }

  const postUsers = (req, res) => {

    const {name, email, password, img, role} = req.body;

    const user = new User({name, email, password, img, role});


    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);


    user.save().then(dbUser => {
      res.json({
        ok: true,
        user: dbUser
      });
    }).catch(err => {
      res.status(500).json({
        ok: false,
        msg: "Error inesperado",
        err
      });
    });
  }

  const putUsers = async (req, res) => {
    //get id from url
    const {_id} = req.params;

    //get body from request
    const {password, google, email, ...rest} = req.body;

    if (password) {
      //encrypt password
      const salt = bcrypt.genSaltSync();
      rest.password = bcrypt.hashSync(password, salt);      
    }

    const user = await User.findByIdAndUpdate(_id, rest);


    res.json({
      msg: "put API",
      user
    });

  }


  const deleteUsers = (req, res) => {
    const {_id} = req.params;

    User.findByIdAndDelete(_id).then(user => {
      res.json({
        ok: true,
        user
      });
    }
    ).catch(err => {
      res.status(500).json({
        ok: false,
        err
      });
    });

  }


  module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}