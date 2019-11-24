const defaults = require('./default');
const devEnv = require('../../../development.config');
const fs = require('fs');
const ejs = require('ejs');
devEnv.init();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateEmailBody = async data => {
  try {
    const templateStr = await fs.readFileSync(`${__dirname}/./signup.ejs`);
    const body = await ejs.render(templateStr.toString(), data);

    return body;
  } catch (err) {
    console.log(err);
  }
};

const send = async (req) => {
  try {
    const data = {
      toName: req.body.first_name + ' ' + req.body.last_name,
      email: req.body.email,
      password: req.body.tempPassword
    };

    console.log(data);
    const emailBody = await generateEmailBody(data);
    const msg = {
      to: data.email,
      from: 'oben@usc.edu',
      subject: 'Your Account is Created',
      html: emailBody.toString()
    };
    sgMail.send(msg);
<<<<<<< HEAD
    return res.status(200).json('msg: Invitation sent');
  } catch(err) {
    return res.status(500).json(err);
=======
  } catch(err) {
    // return res.status(500).json(err);
    console.log(err);
>>>>>>> 764678c52d924496f95eef89245cd56320cd4776
  }
};
// send()
module.exports = {
  send
};
