const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {Itinerary} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

const should = chai.should();

chai.use(chaiHttp);

function seedItineraryData(){	
  console.info('seeding itinerary data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateItineraryData());
  }
  return Itinerary.insertMany(seedData);
}

function generateItineraryData() {
	return {
		destination: faker.address.city(),
		poster: generatePosterData(),
		days: faker.random.number(),
		pois: faker.lorem.words(),
		transportDetails: faker.lorem.sentence(),
		lodgeDetails: faker.lorem.sentence(),
		dayWisePlan: faker.lorem.paragraphs(),
		budget: faker.random.number(),
		travelPartner: "yes",
		tpDetails: faker.lorem.words(),
		postedDate: new Date().toDateString()
	}
}

function generatePosterData() {
	return {
		id: faker.random.number(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName()
	}
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}


describe('Itinerary API resource', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
    return seedItineraryData();
  	});

  	afterEach(function() {
    return tearDownDb();
  	});

	after(function() {
		return closeServer();
	});

	describe('GET endpoint', function() {

    it('should return all itineraries', function() {

      let res;
      return chai.request(app)
        .get('/itineraries')
        .then(function(_res) {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return Itinerary.count();
        })
        .then(function(count) {
          res.body.should.have.lengthOf(count);
        });
    });


    it('should return itineraries with right fields', function() {

      let resItin;
      return chai.request(app)
        .get('/itineraries')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(function(item) {
            item.should.be.a('object');
            item.should.include.keys(
              'id', 'destination', 'poster', 'posterId', 'days', 'pois', 'transportDetails', 
              'lodgeDetails', 'dayWisePlan', 'budget', 'travelPartner', 'tpDetails',
              'postedDate');
          });
          resItin = res.body[0];
          return Itinerary.findById(resItin.id);
        })
        .then(function({id, destination, poster, days, pois, transportDetails, 
              lodgeDetails, dayWisePlan, budget, travelPartner, tpDetails, postedDate}) {
          resItin.id.should.equal(id);
          resItin.destination.should.equal(destination);
          resItin.days.should.equal(days);
          resItin.pois.should.equal(pois);
          resItin.transportDetails.should.equal(transportDetails);
          resItin.lodgeDetails.should.equal(lodgeDetails);
          resItin.dayWisePlan.should.equal(dayWisePlan);
          resItin.budget.should.equal(budget);
          resItin.travelPartner.should.equal(travelPartner);
          resItin.tpDetails.should.equal(tpDetails);
          resItin.poster.should.contain(poster.firstName);
          resItin.poster.should.contain(poster.lastName);
          resItin.posterId.should.equal(poster.id);
          resItin.postedDate.should.equal(postedDate);
        });
    });

    it('should return itineraries with right fields when searched by destination', function() {

      let resItin;
      return Itinerary
      	.findOne()
      	.exec()
      	.then(function(res){
      		return chai.request(app)
            .get(`/itineraries/search/${res.destination}`)
        })
        .then(function(res){
        	res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);
          res.body.forEach(function(item) {
            item.should.be.a('object');
            item.should.include.keys(
              'id', 'destination', 'poster', 'posterId', 'days', 'pois', 'transportDetails', 
              'lodgeDetails', 'dayWisePlan', 'budget', 'travelPartner', 'tpDetails',
              'postedDate');
          });
        	resItin = res.body[0];
          return Itinerary.find({destination: new RegExp(resItin.destination,'i')});
        })
        .then(function(res) {
          resItin.id.should.equal(res[0].id);
          resItin.destination.should.equal(res[0].destination);
          resItin.days.should.equal(res[0].days);
          resItin.pois.should.equal(res[0].pois);
          resItin.transportDetails.should.equal(res[0].transportDetails);
          resItin.lodgeDetails.should.equal(res[0].lodgeDetails);
          resItin.dayWisePlan.should.equal(res[0].dayWisePlan);
          resItin.budget.should.equal(res[0].budget);
          resItin.travelPartner.should.equal(res[0].travelPartner);
          resItin.tpDetails.should.equal(res[0].tpDetails);
          resItin.poster.should.contain(res[0].poster.firstName);
          resItin.poster.should.contain(res[0].poster.lastName);
          resItin.posterId.should.equal(res[0].poster.id);
          resItin.postedDate.should.equal(res[0].postedDate);
        });
    });
  });

	describe('POST endpoint', function() {

    it('should add a new itinerary', function() {

      const newItem = generateItineraryData();

      return chai.request(app)
        .post('/itineraries')
        .send(newItem)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
              'id', 'destination', 'poster', 'posterId', 'days', 'pois', 'transportDetails', 
              'lodgeDetails', 'dayWisePlan', 'budget', 'travelPartner', 'tpDetails',
              'postedDate');
          res.body.id.should.not.be.null;
          res.body.destination.should.equal(newItem.destination);
          res.body.days.should.equal(newItem.days);
          res.body.pois.should.equal(newItem.pois);
          res.body.transportDetails.should.equal(newItem.transportDetails);
          res.body.lodgeDetails.should.equal(newItem.lodgeDetails);
          res.body.dayWisePlan.should.equal(newItem.dayWisePlan);
          res.body.budget.should.equal(newItem.budget);
          res.body.travelPartner.should.equal(newItem.travelPartner);
          res.body.tpDetails.should.equal(newItem.tpDetails);
          res.body.poster.should.contain(newItem.poster.firstName);
          res.body.poster.should.contain(newItem.poster.lastName);
          res.body.posterId.should.equal(newItem.poster.id);
          res.body.postedDate.should.equal(newItem.postedDate);
          return Itinerary.findById(res.body.id);
        })
        .then(function({destination, poster, days, pois, transportDetails, 
              lodgeDetails, dayWisePlan, budget, travelPartner, tpDetails, postedDate}) {
          destination.should.equal(newItem.destination);
          poster.id.should.equal(newItem.poster.id);
          poster.firstName.should.equal(newItem.poster.firstName);
          poster.lastName.should.equal(newItem.poster.lastName);
          days.should.equal(newItem.days);
          pois.should.equal(newItem.pois);
          transportDetails.should.equal(newItem.transportDetails);
          lodgeDetails.should.equal(newItem.lodgeDetails);
          dayWisePlan.should.equal(newItem.dayWisePlan);
          budget.should.equal(newItem.budget);
          travelPartner.should.equal(newItem.travelPartner);
          tpDetails.should.equal(newItem.tpDetails);
          postedDate.should.equal(newItem.postedDate);
        });
    });
  });
});