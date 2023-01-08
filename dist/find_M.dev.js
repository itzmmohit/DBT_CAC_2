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
          return regeneratorRuntime.awrap(findListingsWithMinimumAge(client, {
            minimumAge: 19,
            maximumNumberOfResults: 5
          }));

        case 7:
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);

        case 12:
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(client.close());

        case 15:
          return _context.finish(12);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9, 12, 16]]);
}

main()["catch"](console.error);

function findListingsWithMinimumAge(client) {
  var _ref,
      _ref$minimumAge,
      minimumAge,
      _ref$maximumNumberOfR,
      maximumNumberOfResults,
      cursor,
      results,
      _args2 = arguments;

  return regeneratorRuntime.async(function findListingsWithMinimumAge$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref$minimumAge = _ref.minimumAge, minimumAge = _ref$minimumAge === void 0 ? 0 : _ref$minimumAge, _ref$maximumNumberOfR = _ref.maximumNumberOfResults, maximumNumberOfResults = _ref$maximumNumberOfR === void 0 ? Number.MAX_SAFE_INTEGER : _ref$maximumNumberOfR;
          cursor = client.db("CAC").collection("student").find({
            age: {
              $gte: minimumAge
            }
          }).limit(maximumNumberOfResults); // Store the results in an array

          _context2.next = 4;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 4:
          results = _context2.sent;

          // Print the results
          if (results.length > 0) {
            console.log("Found listing(s) with at least ".concat(minimumAge, " age"));
            results.forEach(function (result, i) {
              console.log();
              console.log("".concat(i + 1, ". name: ").concat(result.name));
              console.log("   _id: ".concat(result._id));
              console.log("   age: ".concat(result.age));
            });
          } else {
            console.log("No listings found with at least ".concat(minimumAge, " Age "));
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}