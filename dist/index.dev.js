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
          return regeneratorRuntime.awrap(listDatabases(client));

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

function listDatabases(client) {
  var databasesList;
  return regeneratorRuntime.async(function listDatabases$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.db().admin().listDatabases());

        case 2:
          databasesList = _context2.sent;
          console.log("Databases:");
          databasesList.databases.forEach(function (db) {
            return console.log(" - ".concat(db.name));
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

;