/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    
     let sum = nums[0];

    // Find longest sequential prefix
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break;
        }
    }

    // Find smallest missing number >= sum
    while (true) {
        let found = false;

        for (const num of nums) {
            if (num === sum) {
                found = true;
                break;
            }
        }

        if (!found) return sum;

        sum++;
    }

};