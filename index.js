const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const db = process.env.MONGO_DB;

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.9fyfw.mongodb.net/${db}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/recipes', auth, recipesRouter);
app.use('/api/auth', usersRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Recipe api!');
});

app.listen(port, () => console.log(`App listening on port ${port}`));

