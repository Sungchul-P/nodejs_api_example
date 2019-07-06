const models = require('../models');

module.exports = () => {
    // force: true ==> 기존에 DB가 있더라도 초기화하여 재생성하는 옵션
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : false
    };
    return models.sequelize.sync(options);
}