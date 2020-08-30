const { Client } = require("pg");
const express = require("express");

// create an express application
const app = express();
app.use(express.json());
// create a postgresql client
const client = new Client({
  database: "social-media",
});

// route handlers go here

// start a server that listens on port 3000 and connects the sql client on success
app.listen(3000, () => {
  client.connect();
});
