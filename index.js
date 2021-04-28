const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1zupo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello from db it's working fixkar website")
})
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('erro',err)
  const ordersCollection = client.db("fixkar").collection("orders");
  const testimonialCollection = client.db("fixkar").collection("testimonial");
  const serivcesCollection = client.db("fixkar").collection("serivces");
  const adminsCollection = client.db("fixkar").collection("admins");

  app.post('/addTestimonial', (req, res) => {
    const testimonial = req.body;
    testimonialCollection.insertOne(testimonial)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
  })

  app.get('/testimonial', (req, res) => {
    testimonialCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
  })

  app.post('/addServices', (req, res) => {
    const services = req.body;
    serivcesCollection.insertOne(services)
    .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount > 0)
    })
  })

  app.get('/services', (req, res) => {
    serivcesCollection.find({})
    .toArray((err, document) => {
        res.send(document)
    })
})

app.post('/addOrder', (req, res) => {
  const newServices = req.body;
  console.log(newServices);
  ordersCollection.insertOne(newServices)
  .then(result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})

app.get('/orders', (req, res) => {
  ordersCollection.find({})
  .toArray((err, document) => {
      res.send(document)
  })
})

app.post('/addAdmin', (req, res) => {
  adminsCollection.insertOne(req.body)
      .then(result => res.send(!!result.insertedCount))
})


});


app.listen(process.env.PORT || port)