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
const user = process.env.MONGO_USER || 'yippyskippy';
const pass = process.env.MONGO_PASS || 'password';
const db = process.env.MONGO_DB || 'project';

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.9fyfw.mongodb.net/${db}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(helmet());

//removed auth middleware for frontend testing purposes
app.use('/api/recipes', recipesRouter);
app.use('/api/auth', usersRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Recipe api!');
});

app.listen(port, () => console.log(`App listening on port ${port}`));

