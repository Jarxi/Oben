const sendErr = (res, err, message, status) => {
  console.log(`\n️ Error:\n ${err}`);

  return res.status(status || 500).json({
    message: message || 'Internal server error!',
    err: err || new Error()
  });
};

module.exports = sendErr;
