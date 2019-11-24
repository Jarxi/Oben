const defaults = require('./default');
const devEnv = require('../../../development.config');
const fs = require('fs');
const ejs = require('ejs');
devEnv.init();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateEmailBody = async data => {
  try {
    const templateStr = await fs.readFileSync(`./signup.ejs`);
    const body = await ejs.render(templateStr.toString(), data);

    return body;
  } catch (err) {
    console.log(err);
  }
};

const send = async (req, res) => {
  try {
    // req.body.data = {
    //   "toName": "abc",
    //   "email":"abc@usc.edu",
    //   "password": "abc"
    // };
    console.log('send is called');
    const data = {
      toName: 'abc',
      email: 'abc@usc.edu',
      password: 'abc'
    };

    const emailBody = await generateEmailBody(data);
    const msg = {
      to: 'ruoxijia@usc.edu',
      from: 'ruoxijia@usc.com',
      subject: 'Your Account is Created',
      text: 'and easy to do anywhere, even with Node.js',
      html: emailBody.toString()
    };
    sgMail.send(msg);
    return res.status(200).json('msg: Invitation sent');
  } catch(err) {
    return res.status(500).json(err);
  }
};

send();

module.exports = {
  send
};
