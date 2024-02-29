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


app.post('/contact', function(req, res){
    console.log(req.body)
    var number=req.body.Phone
    var mssg=req.body.message

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        const abc= " INSERT INTO flakes(fname, number, mssg )  values('mansi','"
            +number+"','"+mssg+
        "');";
      
        con.query(abc, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);

          });
      });

})



     
        
app.post('/details', function(req, res){
    
    
    con.connect(function(err) {
        console.log("Connected!");
        if (err) throw err;
        

        const xyz= "select * from flakes;";

        con.query(xyz, function (err, result, fields) {
            if (err) throw err;

            for(let i=0; i<8; i++){
                console.log("Result: " + result[i]['mssg'])
            };
            
                
            


          });

    });
});

app.get('/login', (req, res)=> {
    console.log(__dirname)
    //   res.sendFile(path.join(__dirname, 'views/form.ejs'))
    res.render("login.ejs", {})
     
    });

    app.get('/contact', (req, res)=> {
        console.log(__dirname)
        //   res.sendFile(path.join(__dirname, 'views/form.ejs'))
        res.render("contact.ejs", {})
         
        });
    
        app.get('/details', (req, res)=> {
            console.log(__dirname)
            //   res.sendFile(path.join(__dirname, 'views/form.ejs'))
            res.render("details.ejs", {})
             
            });
        

    app.listen(4090, function(req,res){
        console.log("server start")
        
    });

