const request = require('supertest');
const should = require('should');
const app = require('../../index');
const models = require('../../models');

describe('GET /users 요청은', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    // DB 동기화 및 초기화(테이블 생성)
    before(()=>models.sequelize.sync({force: true}));
    // 샘플데이터를 DB에 기록한다.
    before(()=>models.User.bulkCreate(users));
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다 ', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    // console.log(res.body);
                    res.body.should.be.instanceOf(Array); // 배열여부 검증
                    done(); // done() 콜백함수를 실행하면 비동기처리를 할 수 있다.
                });
        });

        it('최대 limit 갯수만큼 응답한다 ', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/1는 ', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/1', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    
    describe('실패시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users ', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', () => {
        let name = 'daniel',
            body;
        // before() : 테스트 코드가 실행되기 전에 실행되는 함수
        before(done => {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });
        it('생성된 유저 객체를 반환한다', () => {
            body.should.have.property('id');
        });

        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name);
        });

    });

    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name이 중복일 경우 409를 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done)
        });
    });
});

describe('PUT /users/:id', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force: true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', () => {
        it('변경된 name을 응답한다', (done) => {
            const name = 'chally';
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
                .put('/users/1')
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404를 응답한다', done => {
            request(app)
                .put('/users/999')
                .send({name: 'foo'})
                .expect(404)
                .end(done);
        });
        it('이름이 중복일 경우 409를 응답한다', done => {
            request(app)
                .put('/users/3')
                .send({name: 'bek'})
                .expect(409)
                .end(done);
        });
    });
});