/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    const n = nums.length;

    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // Base case
    for (let i = 0; i < n; i++) {
        dp[i][i] = nums[i];
    }

    // Fill DP table
    for (let len = 2; len <= n; len++) {
        for (let left = 0; left <= n - len; left++) {
            const right = left + len - 1;

            dp[left][right] = Math.max(
                nums[left] - dp[left + 1][right],
                nums[right] - dp[left][right - 1]
            );
        }
    }

    return dp[0][n - 1] >= 0;
};