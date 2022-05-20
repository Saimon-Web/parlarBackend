const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
//middleware
app.use(cors())
app.use(express.json())
//CONNECT MONGODB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hitef.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('parlars-data').collection('services');
        app.get('/service', async (req, res) => {
            const query = {}
            const cursor =  serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })
    }
    finally {

    }
}
run().catch(console.dir)






app.get('/', (req, res) => {
    res.send('Hello jerins parlar!')
})

app.listen(port, () => {
    console.log(`jerins parlar listening on port ${port}`)
})