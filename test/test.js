let chai = require('chai');
let chaiHttp  = require('chai-http');
var request = require('request');
let expect = chai.expect;
chai.use(chaiHttp);
let should = chai.should();
let productURL = 'http://localhost:8081/api/v1/products';
let orderURL = 'http://localhost:8081/api/v1/orders';
let authURL = 'http://localhost:8081/api/v1/auth';

describe('Testing  my Rest Api', () => {

    // it('Test Main Page', function(done) {
    //     request('http://localhost:8081' , function(error, response, body) {
    //         expect(body).to.equal('Hello World');
    //         done();
    //     });
    // });

    it('should  return status 200 for /productsList',function(done){
        chai
            .request(productURL)
            .get('/productsList')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err)
            })
    });

    it('should  return status 200 for /OrderList',function(done){
        chai
            .request(orderURL)
            .get('/ordersList')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err)
            })
    });



/*
    it('it should POST a register', (done) => {
        let user = {
            firstName: 'testFirstName',
            lastName: 'testLastName',
            email: 'test@email.com',
            phone: '1234567890',
            password: '111111',
            role: 'user'
        }

      chai.request(authURL)
          .post('/login')
          .send(user)
          //.end((err, res) => {
               // res.should.have.status(200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
            //done();
          //});
          .then(function(res){
            expect(res).to.have.status(200);
            done();
        })
    });
*/




})