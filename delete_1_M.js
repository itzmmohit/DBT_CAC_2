const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://root:A6lqMZujtVU8Kw12@cluster0.lnxq7wk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // DELETE ONE
        await printIfListingExists(client, "Cozy Cottage");
        // Delete the "Cozy Cottage" listing
        await deleteListingByName(client, "Cozy Cottage");
        // Check that the listing named "Cozy Cottage" no longer exists
        await printIfListingExists(client, "Cozy Cottage");

        // DELETE MANY
        // Check if the listing named "Ribeira Charming Duplex" (last scraped February 16, 2019) exists
        await printIfListingExists(client, "Ribeira Charming Duplex");
        // Check if the listing named "Horto flat with small garden" (last scraped February 11, 2019) exists
        await printIfListingExists(client, "Horto flat with small garden");
        // Delete the listings that were scraped before February 15, 2019
        await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));
        // Check that the listing named "Ribeira Charming Duplex" still exists
        await printIfListingExists(client, "Ribeira Charming Duplex");
        // Check that the listing named "Horto flat with small garden" no longer exists
        await printIfListingExists(client, "Horto flat with small garden");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function deleteListingByName(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne for the deleteOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingsScrapedBeforeDate(client, date) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteMany for the deleteMany() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function printIfListingExists(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        if (result.last_scraped) {
            console.log(`Found a listing in the collection with the name '${nameOfListing}'. Listing was last scraped ${result.last_scraped}.`);
        } else {
            console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        }
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}