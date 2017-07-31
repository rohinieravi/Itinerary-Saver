const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {DATABASE_URL, PORT} = require('./config');
const {Itinerary} = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/itineraries', (req, res) => {
  Itinerary
    .find()
    .sort({postedDate:-1})
    .exec()
    .then(items => {
      res.json(items.map(item =>item.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.get('/itineraries/:id', (req, res) => {
  Itinerary
    .findById(req.params.id)
    .exec()
    .then(item => res.json(item.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly bad'});
    });
});

app.get('/itineraries/search/:destination', (req, res) => {
  Itinerary
    .find({destination: new RegExp(req.params.destination,'i')})
    .exec()
    .then(items => {
      res.json(items.map(item => item.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.post('/itineraries', (req, res) => {
  const requiredFields = ['destination', 'poster', 'days', 'pois'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Itinerary
    .create({
      destination: req.body.destination,
      poster: req.body.poster,
      days: req.body.days,
      pois: req.body.pois,
      transportDetails: req.body.transportDetails,
      lodgeDetails: req.body.lodgeDetails,
      dayWisePlan: req.body.dayWisePlan,
      budget: req.body.budget,
      travelPartner: req.body.travelPartner,
      tpDetails: req.body.tpDetails,
      postedDate: req.body.postedDate
    })
    .then(item => res.status(201).json(item.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};