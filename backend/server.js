/**
 * CREATION ET PARAMETRAGE DU SERVEUR ***********************************************************************************
 */

/** Importation du module http */
const http = require('http'); // Importe le module HTTP intégré à Node.js pour créer un serveur HTTP.

/** Import app */
/** Importation de l'application */
const app = require('./app'); // Importe le module 'app' à partir du fichier 'app.js'. Cela semble être votre application Express.

/** Fonction pour obtenir un PORT valide, quelle que soit la forme d'origine */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// La fonction normalizePort vérifie et normalise le numéro de port sur lequel le serveur écoutera. Elle prend une valeur (généralement 'process.env.PORT' ou '3000') en entrée et retourne un numéro de port valide ou 'false' si elle échoue.
const port = normalizePort(process.env.PORT || '3000');
// Utilise la fonction normalizePort pour déterminer le numéro de port à utiliser, en utilisant 'process.env.PORT' s'il est défini, sinon en utilisant 3000. Le numéro de port est stocké dans la variable 'port'.
app.set('port', port);// Configure l'application Express pour utiliser le numéro de port déterminé ci-dessus.

/** Recherche d'erreurs et gestion appropriée */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/** Création du serveur */
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/** Écoute du serveur */
server.listen(port);
