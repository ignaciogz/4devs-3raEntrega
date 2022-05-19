const { args, DB, config } = require('./config');

const express = require("express");
const app = express();
const ServerMw = require('./utils/middlewares/ServerMw');
const serverRoutes = require('./routes');

// ↓ ****** INICIO - CORS ****** ↓
const cors = require('cors')
app.use(cors('*'));
// ↑ ****** FIN - CORS ****** ↑

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

// ↓ ****** INICIO - GZIP ****** ↓
let responseTime = require("response-time");
app.use(responseTime());

const gzip = require("compression");
app.use(gzip({
    threshold: 0
}));
// ↑ ****** FIN - GZIP ****** ↑

// ↓ ****** INICIO - SESIONES ****** ↓
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 600000 },
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: config.SESSION_SECRET,
    store: MongoStore.create({ 
        mongoUrl: DB.mongoDB.atlas_uri,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    })
}));
// ↑ ****** FIN - SESIONES ****** ↑

// ↓ ****** INICIO - PASSPORT-LOCAL ****** ↓
const { passportLocal } = require("./utils/passport/local");

app.use(passportLocal.initialize());
app.use(passportLocal.session());
// ↑ ****** FIN - PASSPORT-LOCAL ****** ↑

serverRoutes(app);

app.use(ServerMw.routeNotImplemented);


// ↓ ****** INICIO - Clusters y Escalabilidad ****** ↓
const cluster = require('cluster');
const CPUS = require('os').cpus();

if(args.MODE === "CLUSTER" && cluster.isMaster) {
    console.log(`Master PID -> ${process.pid}`)

    // WORKERS
    for (let index = 0; index < CPUS.length; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`El subproceso ${worker.process.pid} ha MUERTO !`)
        cluster.fork()
    })
} else {
    const server = app.listen(args.PORT, () => {
        console.log(`Server on http://localhost:${args.PORT} || Worker: ${process.pid} || Date: ${new Date()}`);
    })
    
    server.on("error", error => console.log(error));
}
// ↑ ****** FIN - Clusters y Escalabilidad ****** ↑