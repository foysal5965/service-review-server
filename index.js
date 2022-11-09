const express= require('express');
const cors= require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.get('/',(req, res)=>{
    res.send('assignment is wating for me')
})



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.3v10x4o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
   
    try{
        const serviceCollection = client.db('mental-health-db').collection('services')
        const reviewCollection = client.db('mental-health-db').collection('review')
        app.get('/services', async(req,res)=>{
            const query= {};
            const cursor= serviceCollection.find(query);
            const result= await cursor.limit(3).toArray();
            res.send(result)
        })
        app.get('/allServices', async(req,res)=>{
            const query= {};
            const cursor= serviceCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })
        app.get('/allServices/:id', async(req,res)=>{
            const id= req.params.id;
            const query= {_id:ObjectId(id)}
            const cursor=await serviceCollection.findOne(query);
            res.send(cursor)
        })
        app.post('/review',async(req,res)=>{
            const reviews= req.body;
            const result= await reviewCollection.insertOne(reviews)
            res.send(result)
        })
        app.post('/addServices', async(req,res)=>{
            const reviews= req.body;
            console.log(reviews)
            const result= await serviceCollection.insertOne(reviews)
            res.send(result)
        })
    app.get('/review', async(req,res)=>{
        
        let  query={};
        if(req.query._id){
            query={
                _id:req.query._id
            }
        }
        const cursor= reviewCollection.find(query);
        const result= await cursor.toArray()
        res.send(result)
    })
        app.get('/myreviews', async (req,res)=>{
            let query= {};
            if(req.query.email){
                query={
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const result= await cursor.toArray();
            res.send(result)
        })
        app.delete('/myreviews/:id',async(req,res)=>{
            const id = req.params.id;
            const query= {_id:ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(er=>console.log())
app.listen(port, (err)=>console.log())