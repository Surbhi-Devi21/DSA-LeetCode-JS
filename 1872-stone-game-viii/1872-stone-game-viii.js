/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {
        const n = stones.length;

    // Build prefix sums
    const prefix = new Array(n);

    prefix[0] = stones[0];

    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + stones[i];
    }

    // Initially, consider taking all n stones
    let dp = prefix[n - 1];

    // Try every possible prefix
    for (let i = n - 2; i >= 1; i--) {
        dp = Math.max(dp, prefix[i] - dp);
    }

    return dp;


};