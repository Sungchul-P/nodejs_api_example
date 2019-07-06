const models = require('../../models');

const index = function (req, res) {
    // limit 변수가 넘어오지 않는 경우를 대비하여, 기본 값을 설정해 준다.
    req.query.limit = req.query.limit || 10;

    // 요청으로 넘어온 값은 문자열이므로, 숫자형으로 변환해줘야 한다.
    // parseInt(변경할 문자열, 진법)
    const limit = parseInt(req.query.limit, 10);

    // limit 변수가 숫자형이 아닌 경우, 400 응답코드 반환
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        });

    // res.json(users.slice(0, limit));
};

const show = function(req, res) {
    const id = parseInt(req.params.id, 10);

    // id가 숫자형이 아닌 경우 400 코드 반환
    if (Number.isNaN(id)) return res.status(400).end();

    // users 배열에서 id가 일치하는 객체만 추출한다. 
    // filter의 반환값은 배열이므로 첫 번째 인덱스만 user 변수에 담는다.
    // const user = users.filter((user) => user.id === id)[0];

    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        // user의 객체가 undefined인 경우 404 코드 반환
        if (!user) return res.status(404).end();
        res.json(user);
    })
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    // 삭제대상이 아닌 id만 필터링 하여 새로운 배열로 저장한다.(삭제 효과)
    // users = users.filter(user => user.id !== id);

    models.User.destroy({
        where: {id}
    }).then(()=> {
        res.status(204).end();
    });
};

const create = (req, res) => {
    const name = req.body.name;

    // name 파라미터 누락 시 400 반환
    if (!name) return res.status(400).end();
    // name 중복 시 409 반환
    // const isConflic = users.filter(user => user.name === name).length;
    // if (isConflic) return res.status(409).end();

    // const id = Date.now();
    // const user = {id, name};
    // users.push(user);

    models.User.create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            // console.log(err);
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        });
};

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    // const isConflict = users.filter(user => user.name === name).length
    // if (isConflict) return res.status(409).end();

    // const user = users.filter(user => user.id === id)[0]
    
    // user.name = name;
    
    models.User.findOne({where: {id}})
    .then(user => {
        if (!user) return res.status(404).end();

        user.name = name;
        user.save()
            .then(_=> {
                res.json(user);
            })
            .catch(err => {
                // console.log(err);
                if (err.name === 'SequelizeUniqueConstraintError') {
                    return res.status(409).end();
                }
                res.status(500).end();
            });
        });
};

module.exports = { index, show, destroy, create, update }