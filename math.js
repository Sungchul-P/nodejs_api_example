function sum(a, b) {
    return a + b;
}

// 외부에서 모듈로 활용하기 위해서는 함수를 키워드로 지정해야 한다.
// 키워드 : 함수명
module.exports = {
    sum: sum
};