var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen('3000',()=>{
    console.log('server is running....');
})

// mysql database connection 

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tododb'
});

// check db connection 

db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected ....');
    }
});

//add data

app.post('/add',(req,res)=>{
    console.log(req.body);
    let sql = ` INSERT INTO todotbl(name,tp)
                VALUES('${req.body.name}','${req.body.tp}')
               `;
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        
});

// Read data 

app.get('/readall',(req,res)=>{
    let sql = `SELECT * FROM todotbl`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})

app.get('/read/:id', (req,res)=>{
    console.log(req.params.id);
    let sql = `SELECT * FROM todotbl
                WHERE id = '${req.params.id}'
                `;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          
});

app.put('/update',(req,res)=>{
        console.log(req.params.id);
        let sql = `UPDATE todotbl SET 
                    name = '${req.body.name}'
                    WHERE id = '${req.body.id}'
                    `;
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        })            
})

//delete data

app.delete('/delete',(req,res)=>{
    let sql = `DELETE FROM todotbl 
                WHERE id = '${req.params.id}'
                `; 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});