const init = () => {
  process.env.Node_ENV = 'development';
  process.env.PORT = 3000;
  process.env.host = `http://localhost:${process.env.port}`
  process.env.dbURL = 'mongodb+srv://ruoxijia:oben@cluster0-pahm8.mongodb.net/test?retryWrites=true&w=majority'
  process.env.JWT_KEY = "secretOrKey"
};

module.exports = { init };
