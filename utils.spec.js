const utils = require('./utils');
// const assert = require('assert');
const should = require('should')

describe('utils.js모듈의 capitalize() 함수는 ', () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다.', () => {
        // 테스트 코드 작성
        const result = utils.capitalize('hello');
        // assert.equal(result, 'Hello'); // 반환값을 기대값과 비교
        result.should.be.equal('Hello');
    })
})