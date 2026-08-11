/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    // Find the longest sequential prefix
    let sum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break;
        }
    }

    // Put all numbers in a Set for quick lookup
    const set = new Set(nums);

    // Find the smallest missing number >= sum
    while (set.has(sum)) {
        sum++;
    }

    return sum;

};