const express = require("express");

// start the app and specify a port to use
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Start the server on port 
app.listen(PORT, function () {

console.log(`Listening on PORT: ${PORT}`)

});
