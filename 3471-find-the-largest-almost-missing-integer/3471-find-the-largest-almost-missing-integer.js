/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    
    const count = new Array(51).fill(0);
    const n = nums.length;

    // Check every subarray of size k
    for (let i = 0; i <= n - k; i++) {
        const seen = new Set();

        for (let j = i; j < i + k; j++) {
            seen.add(nums[j]);
        }

        // Each number is counted only once per subarray
        for (const num of seen) {
            count[num]++;
        }
    }

    // Find largest number appearing in exactly one subarray
    for (let num = 50; num >= 0; num--) {
        if (count[num] === 1) {
            return num;
        }
    }

    return -1;

};