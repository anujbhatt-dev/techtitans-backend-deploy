const mongoose = require('mongoose');
const mongoAtlas = "mongodb+srv://anujbhatt023:anujbhatt023462999@cluster0.d4q7icq.mongodb.net/TechTitans?retryWrites=true&w=majority"
const mongoLocal = 'mongodb://localhost:27017/TechTitans'
mongoose.connect(mongoAtlas,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to database");
}).catch(e=>{
    console.log("connection unsuccessful "+e);
});


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://anujbhatt023:anujbhatt023462999@cluster0.d4q7icq.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
