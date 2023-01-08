const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://root:A6lqMZujtVU8Kw12@cluster0.lnxq7wk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // UPDATE
        // Print the Infinite Views listing
        await findListingByName(client, "Infinite Views");
        // Update the Infinite Views listing to have 6 bedrooms and 8 beds 
        await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
        // Print the updated Infinite Views listing
        await findListingByName(client, "Infinite Views");

        // UPSERT
        // Check if a listing named Cozy Cottage is in the db
        await findListingByName(client, "Cozy Cottage");
        // Upsert the Cozy Cottage listing
        await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });
        // Print the details of the Cozy Cottage listing
        await findListingByName(client, "Cozy Cottage");
        // Upsert the Cozy Cottage listing
        await upsertListingByName(client, "Cozy Cottage", { beds: 2 });
        // Print the details of the Cozy Cottage listing
        await findListingByName(client, "Cozy Cottage");

        // UPDATE MANY
        // Update all listings so they have a property type
        await updateAllListingsToHavePropertyType(client);
        // Print the details of the Cozy Cottage listing that should now have a property type
        await findListingByName(client, "Cozy Cottage");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function updateListingByName(client, nameOfListing, updatedListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne for the updateOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne for the updateOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing }, { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

async function updateAllListingsToHavePropertyType(client) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateMany for the updateMany() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function findListingByName(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the db with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}