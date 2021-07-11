const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const recipesRouter = require('./routes/recipes');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const db = process.env.MONGO_DB;

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.9fyfw.mongodb.net/${db}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/api/recipes', recipesRouter);

app.get('/', (req, res) => {
    res.send('App up and running!');
});


app.listen(port, () => console.log(`App listening on port ${port}`));

