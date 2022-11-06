// Importing Express Node Module dependencies
//======================================================================
const express = require('express');
const mysql = require('mysql2');

// Node Server Config
//======================================================================
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
//======================================================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Importing database connection
//======================================================================
const db = require('./db/connection.js');
db.connect(err => {
  if (err) throw err;
})

// Importing inquirer CL Prompts and calling function on load
//======================================================================
const mainMenu = require('./lib/prompt.js');
mainMenu();


// Default response for any other request (Not Found)
//======================================================================
app.use((req, res) => {
  res.status(404).end();
});

// And Firing up Express Server
//======================================================================
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});
