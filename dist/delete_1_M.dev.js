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
          return regeneratorRuntime.awrap(printIfListingExists(client, "Cozy Cottage"));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(deleteListingByName(client, "Cozy Cottage"));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(printIfListingExists(client, "Cozy Cottage"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(printIfListingExists(client, "Ribeira Charming Duplex"));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(printIfListingExists(client, "Horto flat with small garden"));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(deleteListingsScrapedBeforeDate(client, new Date("2019-02-15")));

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(printIfListingExists(client, "Ribeira Charming Duplex"));

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(printIfListingExists(client, "Horto flat with small garden"));

        case 21:
          _context.prev = 21;
          _context.next = 24;
          return regeneratorRuntime.awrap(client.close());

        case 24:
          return _context.finish(21);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2,, 21, 25]]);
}

main()["catch"](console.error);

function deleteListingByName(client, nameOfListing) {
  var result;
  return regeneratorRuntime.async(function deleteListingByName$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({
            name: nameOfListing
          }));

        case 2:
          result = _context2.sent;
          console.log("".concat(result.deletedCount, " document(s) was/were deleted."));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteListingsScrapedBeforeDate(client, date) {
  var result;
  return regeneratorRuntime.async(function deleteListingsScrapedBeforeDate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({
            "last_scraped": {
              $lt: date
            }
          }));

        case 2:
          result = _context3.sent;
          console.log("".concat(result.deletedCount, " document(s) was/were deleted."));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function printIfListingExists(client, nameOfListing) {
  var result;
  return regeneratorRuntime.async(function printIfListingExists$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(client.db("sample_airbnb").collection("listingsAndReviews").findOne({
            name: nameOfListing
          }));

        case 2:
          result = _context4.sent;

          if (result) {
            if (result.last_scraped) {
              console.log("Found a listing in the collection with the name '".concat(nameOfListing, "'. Listing was last scraped ").concat(result.last_scraped, "."));
            } else {
              console.log("Found a listing in the collection with the name '".concat(nameOfListing, "'"));
            }
          } else {
            console.log("No listings found with the name '".concat(nameOfListing, "'"));
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}