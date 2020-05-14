module.exports = class Sqllite {
  constructor (dbpath) {
    this.sqllite = require('sqlite3').verbose()
    this.dbname = dbpath
    // initialize db
    this.init()
  }

  // Create database if not exist
  init () {
    // open and create database
    const db = this.open(this.dbname)
    // close db
    this.close(db)
  }

  tables (tableNames) {
    // Open db
    const db = this.open(this.dbname)
    // create tables
    for (const [key, value] of Object.entries(tableNames)) {
      const sql = `CREATE TABLE ${key} (${value})`
      db.run(sql, function (err) {
        if (err) { console.log(err) }
      })
    }
    // close database
    this.close(db)
  }

  // open connection
  open (dbname, type) {
    // open and create database
    const db = new this.sqllite.Database(dbname, (err) => {
      if (err) { console.log(err) }
    })
    return db
  }

  // close connection
  close (db) {
    db.close((err) => {
      if (err) {
        if (err) { console.log(err) }
      }
    })
  }

  /**
   *The all() method allows you to execute an SQL query with specified
   *parameters and call a callback to access the rows in the result set.
   */
  all (sql, params, getresult) {
    const db = this.open(this.dbname)
    db.all(sql, params, (err, rows) => {
      if (err) { console.log(err) }
      // send results
      getresult(rows)
    })

    this.close(db)
  }

  /**
   *The get() method executes an SQL query and calls the callback function on the first result row.
   *In case the result set is empty, the row argument is undefined.
   */
  get (sql, params, getresult) {
    // open connection
    const db = this.open(this.dbname, this.opentype)
    db.get(sql, params, (err, row) => {
      // first row only
      if (err) {
        console.log(err)
      }
      getresult(row)
    })
    // close db
    this.close(db)
  }

  /**
   The each() method executes an SQL query with specified
   *parameters and calls a callback for every row in the result set.
   */
  each (sql, params, getresult) {
    // open connection
    const db = this.open(this.dbname, this.opentype)
    // get results
    db.each(sql, params, function (err, row) {
      if (err) { console.log(err) }
      // callback result function
      getresult(row)
    })
    this.close(db)
  }

  // insert one row
  insert (table, columns, values) {
    // open db
    const db = this.open(this.dbname, this.opentype)
    // create columns
    /*   const cols = '(' + columns.join(',') + ')' */
    // create values
    const vals = `(${values.map(val => '?').join(',')})`
    // create sql string
    const sql = `INSERT INTO ${table} (${columns}) VALUES ${vals}`
    // insert one row into the langs table
    db.run(sql, values, function (err) {
      if (err) {
        return console.log(err.message)
      }
    })

    // close the database connection
    this.close(db)
  }
/*  //insert many rows
  insertMany(table,columns,values){
    // open db
    const db = this.open(this.dbname, this.opentype)
    //create columns
    const cols='('+ columns.join(',') +')'
    //create values
    const vals='('+ values.map(val=>'?').join(',') +')'
    //create sql string
    const sql='INSERT INTO '+table+'('+cols+')'+' VALUES'+vals
    console.log(sql)
// construct the insert statement with multiple placeholders
// based on the number of rows
    let placeholders = languages.map((language) => '(?)').join(',');
    let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;

// output the INSERT statement
    console.log(sql);

    db.run(sql, languages, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted ${this.changes}`);
    });
    // close the database connection
    db.close();
  } */
}
