<<<<<<< HEAD
/* Entry Point
 * Author: Miguel Solans, Mateus Silva, Diogo Nogueira
 */
const app = require('./config/server');
const PORT = process.env.PORT || 3030;
=======
const app     = require("./config/server");
const PORT    = process.env.PORT || 3030;
>>>>>>> 765c1fd8a01b49702045aa69576562abd199c243

app.listen(PORT, () => console.log("Server running. Port " + PORT + "."));
