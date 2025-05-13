const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('mydb');
    const collection = db.collection('test');
    const data = await collection.find().toArray();
    res.json(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/add', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('mydb');
    const collection = db.collection('test');
    const result = await collection.insertOne(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.put('/update/:id', async (req, res) => {
    try {
      await client.connect();
      const db = client.db('mydb');
      const collection = db.collection('test');
      const result = await collection.updateOne(
        { _id: new require('mongodb').ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.delete('/delete/:id', async (req, res) => {
    try {
      await client.connect();
      const db = client.db('mydb');
      const collection = db.collection('test');
      const result = await collection.deleteOne({ _id: new require('mongodb').ObjectId(req.params.id) });
      res.json(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  

app.listen(port, () => console.log(`App running on port ${port}`));
