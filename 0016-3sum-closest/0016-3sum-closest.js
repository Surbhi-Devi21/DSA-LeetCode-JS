/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
      nums.sort((a, b) => a - b);

    let closest = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < nums.length - 2; i++) {

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {

            let sum = nums[i] + nums[left] + nums[right];

            // Update closest if current sum is nearer to target
            if (Math.abs(target - sum) < Math.abs(target - closest)) {
                closest = sum;
            }

            // Exact answer mil gaya
            if (sum === target) {
                return sum;
            }
            // Sum chhota hai → increase it
            else if (sum < target) {
                left++;
            }
            // Sum bada hai → decrease it
            else {
                right--;
            }
        }
    }

    return closest;
};