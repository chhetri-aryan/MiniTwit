require("dotenv").config()

const express = require('express');
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const cors = require('cors');
const errorMiddleware = require("./middleware/error-middleware");



//handling cors issue
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json()); // using middleware
app.use("/api/auth", router); //routes
app.use(errorMiddleware); //for handling all the errors in one fn


const port = 5000
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Listening to port: http://localhost:${port}/api/auth`)
    })
})
