const express = require('express');
const session = require('cookie-session');
const { PORT, SERVER_SESSION_SECRET, APS_CALLBACK_URL } = require('./config.js');

let app = express();

// Izpiši vrednost APS_CALLBACK_URL, kot je definirana v config.js
console.log('APS_CALLBACK_URL (config):', APS_CALLBACK_URL);
// Izpiši vrednost iz okolja, ki jo bere tvoj proces
console.log('Process env APS_CALLBACK_URL:', process.env.APS_CALLBACK_URL);

// Debug endpoint za prikaz APS_CALLBACK_URL v brskalniku
app.get('/debug', (req, res) => {
  res.send(`APS_CALLBACK_URL from process.env: ${process.env.APS_CALLBACK_URL}`);
});

app.use(express.static('wwwroot'));
app.use(session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 }));
app.use(require('./routes/auth.js'));
app.use(require('./routes/hubs.js'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));