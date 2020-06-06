const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { transporter,getPasswordResetURL,resetPasswordTemplate} = require("../middleware/email");
  

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/receive_new_password/:userId/:token", (req, res) => {
const { userId, token } = req.params
  const { password } = req.body
  console.log(password)
  // highlight-start
  User.findOne({ _id: userId })
    .then(user => {
      const secret = user.password + "-" + user.createdAt
      const payload = jwt.decode(token, secret)
      if (payload.userId === user.id) {
        bcrypt.genSalt(10, function(err, salt) {
          // Call error-handling middleware:
          if (err) return
          bcrypt.hash(password, salt, function(err, hash) {
            // Call error-handling middleware:
            if (err) return
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => res.status(202).json("Password changed accepted"))
              .catch(err => res.status(500).json(err))
          })
        })
      }
    })
    // highlight-end
    .catch(() => {
      res.status(404).json("Usuario Invalido")
    })
})

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});



router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post("/reset_pw/user/:email",(req,res) => {
    const { email } = req.params
    User.findOne({email}, (err, user)=> {
        if(!user)
        return res.json({
            loginSuccess: false,
            message: "Auth failed, email not found"
        });
        
        user.generateTokenResetPassword((err,user) => {
            if (err) return res.status(400).send(err);
                const token = user.token
                const url = getPasswordResetURL(user,token)
                const emailTemplate = resetPasswordTemplate(user, url)

                 
            const sendEmail = () => {
                transporter.sendMail(emailTemplate, (err, info) => {
                  if (err) {
                    res.status(500).json("Error sending email")
                  }
                  console.log(`** Email sent **`, info.response)
                })
              }

            sendEmail()              
        })    

    })
    
 /*   User.findOne({ email: req.params }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

           user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                const token = user.token
                const url = getPasswordResetURL(user,token)
                const emailTemplate = resetPasswordTemplate(user, url)
          
            const sendEmail = () => {
              transporter.sendMail(emailTemplate, (err, info) => {
                if (err) {
                  res.status(500).json("Error sending email")
                }
                console.log(`** Email sent **`, info.response)
              })
            }
            sendEmail() */

        
    })
    

    
        
        /*res.cookie("w_authExp", user.tokenExp);
        res
            .cookie("w_auth", user.token)
            .status(200)
            .json({
                loginSuccess: true, userId: user._id
            });*/
    
      

  


module.exports = router;
