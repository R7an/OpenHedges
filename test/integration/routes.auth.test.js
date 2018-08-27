process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);



const server = require('../../server/server.js');
const database = require('../../server/models/index.js').sequelize;

describe('routes : auth', () => {

    beforeEach(() => {
        return database.drop()
            .then(() => { return database.sync(); });
    });

    afterEach(() => {
        return database.drop();
    });
    describe('POST /register', () => {
            it('should register a new user', (done) => {
                chai.request(server)
                    .post('/api/auth/register')
                    .send({
                        email: 'michael@gmail.com',
                        password: 'herman'
                    })
                    .end((err, res) => {
                        //should.exist(res.body);
                        should.not.exist(err);
                        //res.redirects.length.should.eql(0);
                        res.status.should.eql(200);
                        res.type.should.eql('application/json');
                        done();
                    });

            });
    });
});
