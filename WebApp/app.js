/* Entry Point
 * Author: Miguel Solans, Mateus Silva, Diogo Nogueira
 */
const app = require('./config/server');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || process.env.APP_PORT;

app.listen(PORT, () => console.log(`Magic Port ${PORT}`));
