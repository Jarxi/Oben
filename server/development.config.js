const init = () => {
  process.env.Node_ENV = 'development';
  process.env.PORT = 3000;
  process.env.host = `http://localhost:${process.env.PORT}`;
  process.env.dbURL = 'mongodb+srv://ruoxijia:oben@cluster0-pahm8.mongodb.net/test?retryWrites=true&w=majority';
  process.env.JWT_KEY = "secretOrKey";
  process.env.SENDGRID_API_KEY='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';
};

module.exports = { init };
