import express from "express"
import path from 'path'
import { fileURLToPath } from 'url'; 
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))


const __dirname = path.dirname(fileURLToPath(import.meta.url));

var con = mysql.createConnection({
    host: "localhost",
    user: "db_login",
    database: "db_login",
    password: "Kdrama"
  });
  
 

app.use(express.static(path.join(__dirname, 'public')))

app.post('/login', function(req, res){
    console.log(req.body)
    var email=req.body.email

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        const sql= 'INSERT INTO snow(fname, lname, Email)  values("pallavi", "patil","'
        +email+
        '");';

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);

          });
      });

});


app.get('/login', (req, res)=> {
    console.log(__dirname)
    //   res.sendFile(path.join(__dirname, 'views/form.ejs'))
    res.render("login.ejs", {})
     
    });

    app.listen(4090, function(req,res){
        console.log("server start")
        
    });
