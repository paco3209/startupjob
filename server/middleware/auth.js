const { User } = require('../models/User');
const moment = require('moment');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    if(user){
      var oneHour = moment().valueOf();
      if(user.tokenExp < oneHour){
        return res.json({
          isAuth: false,
          error: true
        });
      }
    }  
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
