/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {
     let temp = n;
    let sum = 0;
    let product = 1;

    while (temp > 0) {
        const digit = temp % 10;

        sum += digit;
        product *= digit;

        temp = Math.floor(temp / 10);
    }

    return n % (sum + product) === 0;

};