const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Hello world', function() {

	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should return a html with status code 200', function() {
		return chai.request(app)

			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.html;
			});
	});

});