/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function(nums) {
       const n = nums.length;

    let minIndex = 0;
    let maxIndex = 0;

    // Find index of minimum and maximum
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }

        if (nums[i] > nums[maxIndex]) {
            maxIndex = i;
        }
    }

    // Put smaller index in minIndex
    if (minIndex > maxIndex) {
        [minIndex, maxIndex] = [maxIndex, minIndex];
    }

    // 1. Remove both from the front
    const fromFront = maxIndex + 1;

    // 2. Remove both from the back
    const fromBack = n - minIndex;

    // 3. Remove min from front and max from back
    const bothSides = (minIndex + 1) + (n - maxIndex);

    return Math.min(fromFront, fromBack, bothSides);
};