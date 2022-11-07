const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extented: true }));
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/public/src"))
app.use(express.static(__dirname + "/public/ui"))

app.listen(port, () => {
	console.log("Listening at", port);
});
