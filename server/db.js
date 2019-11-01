const mongoose = require('mongoose');

const dbURL = process.env.dbURL || 'mongodb+srv://ruoxijia:oben@cluster0-pahm8.mongodb.net/test?retryWrites=true&w=majority';

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set('useFindAndModify', false);

mongoose.connect(dbURL, options);

// Log Mongoose connection status changes:
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connection is open on\n\t${dbURL}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection had an error:\n${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected due to app termination processs.');
        process.exit(0);
    });
});
