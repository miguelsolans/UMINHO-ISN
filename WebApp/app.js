/* Entry Point
 * Author: Miguel Solans, Mateus Silva, Diogo Nogueira
 */
const app = require('./config/server');
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log("Server running. Port " + PORT + "."));
