const express = require('express');
const mongodb = require('mongodb');
const { ObjectID } = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPosts();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPosts();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPosts();
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send({});
  });

/*router.delete('/:id', async (req, res) => {
    const posts = await loadPosts();

    // Mongo DB no longer exports ObjectID
    await posts.deleteOne({_id: new ObjectID(req.params.id)
    });

    res.status(200).send();
});
*/
// Update Posts
async function loadPosts() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://NotDeaf:8YVpj1fVaxtcoEaI@p3posts.xy4ojmz.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true});

    return client.db('p3posts').collection('posts');
}
module.exports = router;