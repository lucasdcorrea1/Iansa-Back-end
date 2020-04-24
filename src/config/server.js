const app = require("../index.js");
const Env = require("../config/environment");

const PORT = Env.port || 3333;
app.listen(PORT, () => {});
