const express = require('express');
const ejs = require('ejs');
//const Joi = require('joi'); //used for validation
var bodyParser = require('body-parser');
var path = require('path');
//const obj=require('./obj.js')
const cur = require("./db.js");
const { response } = require('express');
const monmodel = require('./db.js');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome to REST API with Node.js Tutorial!!');
});
app.get('/nav', (req,res)=> {
    res.sendFile(path.join(__dirname,"/nav.html"));
    });
app.get('/reg', (req,res)=> {
res.sendFile(path.join(__dirname,"/register.html"));
});
app.post('/data', (req,res)=> {
//res.send(req.query);
sname=req.body.fname;
roll=req.body.lname;
const obj1 = new cur({
    name:sname,
    roll: roll
});
obj1.save()
res.render('index.ejs',{firstName:sname,lastName:roll});
}); 
app.get('/login', (req,res)=> {
    res.sendFile(path.join(__dirname,"/login.html"));
    });
    app.post('/loginv', (req,res)=> {
        sname=req.body.fname;
        roll=req.body.lname;
        console.log(sname);
        const obj2={
        name: sname,
        roll: roll,
        };
        const query1 = cur.find({name:obj2.name},function(err,data){
        var user = data;
        console.log(data.length)
        if(data.length<1)
        {
        res.render('nr.ejs',{firstName:obj2.name,lastName:obj2.roll});
        }
        else {
        res.render('logv.ejs',{firstName:obj2.name,lastName:obj2.roll});
        }
        }) 
        });
    
        app.get('/gdata', (req,res)=> {
            //res.send(obj);
            const query = cur.find({}, function(err,data){
            res.render('home.ejs',{data:data});
            });
            });
             app.get('/del', (req,res)=> {
                console.log(req.query.nm);

                cur.deleteOne({name:req.query.nm,lname:req.query.lnm},function (err) {
                if(err) console.log(err);
                const query = cur.find({}, function(err,data){
                res.render('home.ejs',{data:data});
                });
                }); 
            }); 
 /* app.get("/ndata",(res,req) =>{
    app.send("First: "+req.obj2.name +" Last: "+req.query.lname);
});  */
app.listen(3000);