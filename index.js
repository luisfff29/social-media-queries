const { Client } = require("pg");
const express = require("express");
const PORT = 3000;

// create an express application
const app = express();
app.use(express.json());
// create a postgresql client
const client = new Client({
  database: "social-media",
});

// route handlers go here
app.get("/users", (req, res) => {
  client.query("SELECT * FROM users", (err, result) => {
    res.send(result.rows);
  });
});

app.post("/users", (req, res) => {
  const text = "INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *";
  const values = [
    "kenzie",
    "Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana. Our 6-month to 2-year program with 1-year paid apprenticeship is a new alternative to traditional colleges and short-term coding bootcamps.",
  ];
  client.query(text, values, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(result.rows[0]);
      res.json({
        message: "User was successfully inserted into 'users' table.",
      });
    }
  });
});

app.get("/users/:id", (req, res) => {
  client.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    (err, result) => {
      res.send(result.rows[0]);
    }
  );
});

// start a server that listens on port 3000 and connects the sql client on success
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
  client.connect();
});
