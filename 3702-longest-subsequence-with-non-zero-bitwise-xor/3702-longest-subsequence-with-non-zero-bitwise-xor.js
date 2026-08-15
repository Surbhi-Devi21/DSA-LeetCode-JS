/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubsequence = function(nums) {
        let xor = 0;

    for (const num of nums) {
        xor ^= num;
    }

    // If total XOR is non-zero, take the whole array.
    if (xor !== 0) {
        return nums.length;
    }

    // Total XOR is zero.
    // If there is any non-zero element, remove that one element.
    // The remaining XOR becomes non-zero.
    for (const num of nums) {
        if (num !== 0) {
            return nums.length - 1;
        }
    }

    // All elements are zero.
    return 0;
};