const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 6001
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.nsfts4x.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // database and collections

    const menuCollections = client.db("demo-foodi-client").collection("menus");
    const cartCollections = client.db("demo-foodi-client").collection("cartItems");

    // all menu items operations

    app.get('/menu',async(req,res)=>{
        const result = await menuCollections.find().toArray();
        res.send(result);
    })

    // all carts operations
    app.post('/carts',async(req,res)=>{
        const cartItem = req.body;
        const result = await cartCollections.insertOne(cartItem);
        res.send(result);
    })

    // get carts using email
    app.get('/carts',async(req,res)=>{
        const email = req.query.email;
        const filter = {email:email};
        const result = await cartCollections.find(filter).toArray();
        res.send(result);
    })

    // get specific item or product from the cart
    app.get('/carts/:id',async(req,res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await cartCollections.findOne(filter);
        res.send(result);
    })

    // delete items from cart
    app.delete('/carts/:id',async(req,res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await cartCollections.deleteOne(filter);
        res.send(result);
    })

    // update carts quantity
    app.put("/carts/:id", async (req, res) => {
        const id = req.params.id;
        const { quantity } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                quantity: parseInt(quantity, 10)
            }
        };
    
        try {
            const result = await cartCollections.updateOne(filter, updateDoc);
            res.json(result); // Send response to client
        } catch (error) {
            console.error('Error updating item quantity:', error);
            res.status(500).json({ error: 'Internal server error' }); // Handle error
        }
    });
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})