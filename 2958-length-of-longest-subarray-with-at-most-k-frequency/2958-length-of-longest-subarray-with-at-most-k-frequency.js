/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {
     const freq = new Map();

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        // Add nums[right]
        freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

        // Window is invalid
        while (freq.get(nums[right]) > k) {
            freq.set(
                nums[left],
                freq.get(nums[left]) - 1
            );

            left++;
        }

        // Current window is good
        maxLength = Math.max(
            maxLength,
            right - left + 1
        );
    }

    return maxLength;

};