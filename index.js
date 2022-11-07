const express= require('express');
const cors= require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.get('/',(req, res)=>{
    res.send('assignment is wating for me')
})



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.3v10x4o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    const serviceCollection = client.db('mental-health-db').collection('services')
    try{
        app.get('/services', async(req,res)=>{
            const query= {};
            const cursor= serviceCollection.find(query);
            const result= await cursor.limit(3).toArray();
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(er=>console.log())
app.listen(port, (err)=>console.log())