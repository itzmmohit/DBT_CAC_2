const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://root:A6lqMZujtVU8Kw12@cluster0.lnxq7wk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await createMultipleListings(client, [
            {
                name: "Ankita Arora",
                regno: 1004819142,
                course: "MCA",
                loc: "Delhi",
                phno: 9865754564,
                age : 19
            },
            {
                name: "Muskan Gupta",
                regno: 1004819095,
                course: "MCA",
                loc: "Delhi",
                phno: 9765754564,
                age : 20
            }
        ]);

    } catch(e){
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function createMultipleListings(client, newListing){
    const result = await client.db("CAC").collection("student").insertMany(newListing);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}