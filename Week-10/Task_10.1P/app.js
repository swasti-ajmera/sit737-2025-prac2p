const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB connection error:", err));

app.get('/', (req, res) => {
  res.send('Hello from Node.js app! Week 10');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
