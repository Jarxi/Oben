const init = () => {
  process.env.Node_ENV = 'development';
  process.env.PORT = 3000;
  process.env.host = `http://localhost:${process.env.port}`
  process.env.dbURL = 'mongodb://127.0.0.1:27017/oben'
};

module.exports = { init };
