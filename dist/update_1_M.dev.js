"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

function main() {
  var uri, client;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          uri = "mongodb+srv://root:A6lqMZujtVU8Kw12@cluster0.lnxq7wk.mongodb.net/?retryWrites=true&w=majority";
          client = new MongoClient(uri);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(client.connect());

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(findListingByName(client, "Infinite Views"));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(updateListingByName(client, "Infinite Views", {
            bedrooms: 6,
            beds: 8
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(findListingByName(client, "Infinite Views"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(findListingByName(client, "Cozy Cottage"));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(upsertListingByName(client, "Cozy Cottage", {
            name: "Cozy Cottage",
            bedrooms: 2,
            bathrooms: 1
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(findListingByName(client, "Cozy Cottage"));

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(upsertListingByName(client, "Cozy Cottage", {
            beds: 2
          }));

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(findListingByName(client, "Cozy Cottage"));

        case 21:
          _context.next = 23;
          return regeneratorRuntime.awrap(updateAllListingsToHavePropertyType(client));

        case 23:
          _context.next = 25;
          return regeneratorRuntime.awrap(findListingByName(client, "Cozy Cottage"));

        case 25:
          _context.prev = 25;
          _context.next = 28;
          return regeneratorRuntime.awrap(client.close());

        case 28:
          return _context.finish(25);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2,, 25, 29]]);
}

main()["catch"](console.error);

function updateListingByName(client, nameOfListing, updatedListing) {
  var result;
  return regeneratorRuntime.async(function updateListingByName$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").updateOne({
            name: nameOfListing
          }, {
            $set: updatedListing
          }));

        case 2:
          result = _context2.sent;
          console.log("".concat(result.matchedCount, " document(s) matched the query criteria."));
          console.log("".concat(result.modifiedCount, " document(s) was/were updated."));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function upsertListingByName(client, nameOfListing, updatedListing) {
  var result;
  return regeneratorRuntime.async(function upsertListingByName$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").updateOne({
            name: nameOfListing
          }, {
            $set: updatedListing
          }, {
            upsert: true
          }));

        case 2:
          result = _context3.sent;
          console.log("".concat(result.matchedCount, " document(s) matched the query criteria."));

          if (result.upsertedCount > 0) {
            console.log("One document was inserted with the id ".concat(result.upsertedId._id));
          } else {
            console.log("".concat(result.modifiedCount, " document(s) was/were updated."));
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function updateAllListingsToHavePropertyType(client) {
  var result;
  return regeneratorRuntime.async(function updateAllListingsToHavePropertyType$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").updateMany({
            property_type: {
              $exists: false
            }
          }, {
            $set: {
              property_type: "Unknown"
            }
          }));

        case 2:
          result = _context4.sent;
          console.log("".concat(result.matchedCount, " document(s) matched the query criteria."));
          console.log("".concat(result.modifiedCount, " document(s) was/were updated."));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function findListingByName(client, nameOfListing) {
  var result;
  return regeneratorRuntime.async(function findListingByName$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").findOne({
            name: nameOfListing
          }));

        case 2:
          result = _context5.sent;

          if (result) {
            console.log("Found a listing in the db with the name '".concat(nameOfListing, "':"));
            console.log(result);
          } else {
            console.log("No listings found with the name '".concat(nameOfListing, "'"));
          }

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}