const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://root:A6lqMZujtVU8Kw12@cluster0.lnxq7wk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await createListing(client, {
            name: "Aakansha Agarwal",
            regno: 1004819162,
            course: "MCA",
            loc: "Delhi",
            phno: 9565754564,
            age : 20
        });

    } catch(e){
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing){
    const result = await client.db("CAC").collection("student").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}