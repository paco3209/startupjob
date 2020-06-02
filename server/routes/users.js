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
        console.log(user)
        user.generateToken((err,user) => {
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
