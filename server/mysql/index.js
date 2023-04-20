const mysql = require("mysql2");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "testdb",
});

const create_table = `
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
`;

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to localhost");
});

connection.query('SELECT * FROM users', (error, results) => {
  if (error) {
    throw error;
  }

  app.post("/register", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const insert_user = `INSERT INTO users (fname,lname , email, password) VALUES ('${fname}','${lname}', '${email}', '${password}')`;

      connection.query(insert_user, (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            res.status(400).json({ error: "Username or email already exists" });
          } else {
            res.status(500).json({ error: "Internal not server error" });
          }
        } else {
          res.json({ message: "Registration successful" });
        }
      });
    }
  });

  app.listen(5000, () => {
    console.log("Server is listening on port 5000");
  });

  console.log("Users:", results);
});
