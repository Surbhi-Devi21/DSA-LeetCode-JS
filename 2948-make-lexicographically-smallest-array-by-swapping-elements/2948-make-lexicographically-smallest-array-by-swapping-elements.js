/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
     const n = nums.length;

    // [value, originalIndex]
    const arr = nums.map((value, index) => [value, index]);

    // Sort by value
    arr.sort((a, b) => a[0] - b[0]);

    let i = 0;

    while (i < n) {
        let j = i;

        // Find one connected group
        while (j + 1 < n && arr[j + 1][0] - arr[j][0] <= limit) {
            j++;
        }

        // Values of this group are already sorted
        const values = [];

        // Indices of this group
        const indices = [];

        for (let p = i; p <= j; p++) {
            values.push(arr[p][0]);
            indices.push(arr[p][1]);
        }

        // Put smallest values at smallest indices
        indices.sort((a, b) => a - b);

        for (let p = 0; p < values.length; p++) {
            nums[indices[p]] = values[p];
        }

        i = j + 1;
    }

    return nums;

};