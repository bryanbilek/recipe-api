const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('App up and running!')
})

app.listen(port, () => console.log(`App listening on port ${port}`));

