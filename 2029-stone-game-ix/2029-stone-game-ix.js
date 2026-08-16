/**
 * @param {number[]} stones
 * @return {boolean}
 */
var stoneGameIX = function(stones) {
    const cnt = [0, 0, 0];

    for (const stone of stones) {
        cnt[stone % 3]++;
    }

    const [zero, one, two] = cnt;

    // No remainder-1 or remainder-2 stones
    if (one === 0 || two === 0) {
        return Math.max(one, two) > 2 && zero % 2 === 1;
    }

    // Both remainder-1 and remainder-2 stones exist
    if (Math.abs(one - two) > 2) {
        return true;
    }

    return zero % 2 === 0;

};