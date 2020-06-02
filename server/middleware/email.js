
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
})

let getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user._id}/${token}`

let resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "🌻 Backwoods Password Reset 🌻"
  const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>We heard that you lost your Backwoods password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Backwoods</p>
  `

  return { from, to, subject, html }
}

module.exports = { getPasswordResetURL,resetPasswordTemplate, transporter };

