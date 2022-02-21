const express = require("express");
const router = require("./router");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:pAsSwOrD321@dev-cluster.fcuvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

let db = mongoose.connection;
db.on("error", () => {
  console.error.bind(console.Console, "connection error:");
});
db.once("open", function callback() {
  console.log("Database is connected");
});