const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Dependencies
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle Production
if(process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static('__dirname' + "/public/"));

    // Handle SPA, must be under posts
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));