const express = require('express');
const compression = require('compression');
const serve = express();
const app = express();
const gzipStatic = require('connect-gzip-static');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('oauth:server');
const dir = './dist';
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const port = config.port;
const appName = config.subDomain;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

serve.use(appName, app);

app.use(compression());
app.use(gzipStatic(path.join(__dirname, '/dist')));

// OAUTH
app.get('/oauth', (req, res, next) => {
  debug('Login oauth');
  res.sendFile(path.join(__dirname, '/oauth/login.html'));
});
app.get('/oauth_logout', (req, res, next) => {
  debug('Logout oauth');
  res.sendFile(path.join(__dirname, '/oauth/logout.html'));
});

// Fake auth
serve.use(cors());
serve.post('/autenticar', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data-auth.example.json', 'utf8'));
  res.send(data);
});

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`);

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message });
  }

  res.status(500).send({ error: err.message });
});

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);

serve.listen(port, function () {
  console.log(`${chalk.blue('[OAUTH]')}: server listening on port: ${port}`);
});
