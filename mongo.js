const { MongoClient } = require("mongodb");                                                                                                                                       
const uri = "mongodb+srv://m2220user:m2220password@cluster0.dsjyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
 
 // The database to use
 const dbName = "test";

 let personDocument = 
 {
   id: 136984310,
   is_bot: false,
   first_name: 'Roman',
   last_name: 'Velboi',
   username: 'Napolik',
   language_code: 'uk'
 }
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("people");
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);