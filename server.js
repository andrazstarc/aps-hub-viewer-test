const express = require('express');
const session = require('cookie-session');
const { PORT, SERVER_SESSION_SECRET, APS_CALLBACK_URL } = require('./config.js');

let app = express();

// Preveri, ali se vrednost APS_CALLBACK_URL pravilno bere iz .env datoteke
console.log('APS_CALLBACK_URL:', APS_CALLBACK_URL); // To bo izpisalo vrednost URL-ja iz .env datoteke

app.use(express.static('wwwroot'));
app.use(session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 }));
app.use(require('./routes/auth.js'));
app.use(require('./routes/hubs.js'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
