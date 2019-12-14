const nodemailer = require('nodemailer');

module.exports.sendMail = (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: 'Gmail',
    auth: {
      user: 'webcore.comp313@gmail.com',
      pass: 'Comp313w2019'
    }
  });

  var mailOptions = {
    from: req.body.mail,
    to: 'webcore.comp313@gmail.com',
    subject: req.body.subject,
    text: 'From ' + req.body.name + ': ' + req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return res.json({ success: false, msg: error.message });
    } else {
      return res.json({ success: true, msg: info.message });
    }
  });
}

