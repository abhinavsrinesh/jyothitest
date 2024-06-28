const express = require('express')
const app = express()
const cors= require('cors');
const { MongoClient } = require('mongodb')
app.use(cors());
app.use(express.json());                
let user =[];
let db='';

 async function mongoConnect(){
    let client = new MongoClient('mongodb+srv://abhinav:<password>@cluster0.bh9wipy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
    ;
 }



app.get('/users',async function(req,res){
    let user = await db.collection('user').find({}).toArray();
    res.json(user)
    // res.json(info)
})

// let info=[{'ph no':'9887656789','age':'20'},{'ph no':'8765678987','age':'24'}]
// app.get('/info',function(req1,res1){
// res1.json(info)

// })
// let product=[{'pname':'shoes','description':'leather,cloth,water resistant,long lasting'},{'pname':'pants','description':'cotton,sraight,water resistant,long lasting'}}]
// app.get('/product',function(req1,res1){
// res1.json(info)

// })

app.post('/register', async function (req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);

  });

  app.post('/login',async function(req,res)
{   
    console.log(req,res);
    let user = await db.collection('user').find({'email':req.body.email}).toArray();
    if(user.length == 0){
        return res.json("email not found")
    }
        else{
            if(user[0].password == req.body.password){
                return res.json(user(0));
            }
            return res.json("invalid")

        }
    })
app.listen(3000,function() {
    console.log('server is ready,listening on port 3001')
    mongoConnect();

})