const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Matheus')`
connection.query(sql)

let people = [];

connection.query("SELECT * FROM people", function (err, result, fields) {
    if (err) throw err;
    people = result;
});

connection.end()

app.get('/', (req,res) => {
    res.send(
        `<h1>Full Cycle Rocks!</h1>` +
        `<h2>Nomes cadastrados:</h2> ` +
        people.map(el =>
          `<h3>${el.name}</h3>
          `
        ).join('')
      )
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})