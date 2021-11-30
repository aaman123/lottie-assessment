const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require('./db');
const { ApolloServer } = require('apollo-server-express');
const schemas = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');
const sessionStore = new SequelizeStore({ db });

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
app.set("port", PORT);

const apollo = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});

const startApolloServer = async() => {
  await apollo.start();
  apollo.applyMiddleware({ app, path: '/gqApi'});
}

startApolloServer();

const server = http.createServer(app)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const { json, urlencoded } = express;
app.use(json({limit: '50mb'}));
app.use(urlencoded({ extended: true }));
app.use("/api", require('./routes/fetchLottie'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running");
    });
}

sessionStore
  .sync()
  .then(() => db.sync())
  .then(() => {
    server.listen(PORT);
    server.on("error", onError);
    server.on("listening", onListening);
  });

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  
    console.log('\x1b[32m',`Listening on ${bind}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
  