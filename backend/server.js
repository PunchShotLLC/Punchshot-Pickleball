const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_TEST_URI;
mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const tournamentsRouter = require('./routes/tournaments');

//All routers (middleware) will be placed here
app.use('/users', usersRouter)
app.use('/tournaments', tournamentsRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});