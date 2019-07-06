const Sequelize = require('sequelize');
// DB 정보가 담긴 sequelize 객체 생성
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
});

// 테이블 이름과 속성을 정의하여 객체를 생성한다.
const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = {Sequelize, sequelize, User};