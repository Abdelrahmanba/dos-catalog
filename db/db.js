const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./db/catalog.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite database.');
});

module.exports = db