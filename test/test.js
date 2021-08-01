const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app.js');

chai.use(chaiHttp);

describe('Funcionalidade básica', () => {
    // teste básico
    it('Deve conseguir responder a uma requisição qualquer', (done) => {
        chai.request(app).post('').set('content-type', 'application/x-www-form-urlencoded').send({}).end((error, response) => {
            if (error) {
                return done(error);
            } else {
                chai.expect(response.status).not.be.undefined;
                chai.expect(response.status).not.be.null;
                return done();
            }
        });
    });

    // rota inexistente
    it('Deve responder a uma requisição em uma rota inexistente com status 404', (done) => {
        chai.request(app).post('/nonexistent').set('content-type', 'application/x-www-form-urlencoded').send({}).end((error, response) => {
            if (error) {
                done(error);
            } else {
                chai.expect(response.status).not.be.undefined;
                chai.expect(response.status).not.be.null;
                chai.expect(response.status).to.equal(404);

                return done();
            }
        });
    });

    // /notification
    it('Deve responder a uma requisição de sucesso válida em /notification com status 204', (done) => {
        chai.request(app).post('/notification').set('content-type', 'application/x-www-form-urlencoded').send({
            evt: 'ReportGenerated',
            execution: '20201015.111226-ij0uxv',
            owner: '56',
            bot: 'pje-trt-copia-integral'
        }).end((error, response) => {
            if (error) {
                return done(error);
            } else {
                chai.expect(response.status).not.be.undefined;
                chai.expect(response.status).not.be.null;
                chai.expect(response.status).to.equal(204);

                return done();
            }
        });
    });
    it('Deve responder a uma requisição de falha válida em /notification com status 204', (done) => {
        chai.request(app).post('/notification').set('content-type', 'application/x-www-form-urlencoded').send({
            evt: 'ExecutionFinishedWithError',
            execution: '20201015.111226-ij0uxv',
            owner: '56',
            bot: 'pje-trt-copia-integral'
        }).end((error, response) => {
            if (error) {
                return done(error);
            } else {
                chai.expect(response.status).not.be.undefined;
                chai.expect(response.status).not.be.null;
                chai.expect(response.status).to.equal(204);

                return done();
            }
        });
    });
    it('Deve responder a uma requisição inválida em /notification com status 400', (done) => {
        chai.request(app).post('/notification').set('content-type', 'application/x-www-form-urlencoded').send({}).end((error, response) => {
            if (error) {
                done(error);
            } else {
                chai.expect(response.status).not.be.undefined;
                chai.expect(response.status).not.be.null;
                chai.expect(response.status).to.equal(400);

                return done();
            }
        });
    });
});