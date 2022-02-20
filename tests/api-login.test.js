let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';

describe('Conectando al API vía autenticación: ', () => {
  it('Consultado URL y autenticación', (done) => {
    chai.request(url)
      .post('/autenticar').send({
        id: 0,
        username: 'admin',
        password: 'Developer',
        days: 10
      })
      .end(function (_err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('finalizado');
        done();
      });
  });
});
