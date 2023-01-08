const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://root:A6lqMZujtVU8Kw12@cluster0.lnxq7wk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await findListingsWithMinimumAge(client, {
            minimumAge: 19,
            maximumNumberOfResults: 5
        });
    } catch(e){
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function findListingsWithMinimumAge(client, {
    minimumAge = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    const cursor = client.db("CAC").collection("student")
        .find({
            age: { $gte: minimumAge },
        }
        )
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumAge} age`);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   age: ${result.age}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumAge} Age `);
    }
}