/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let start = 0 ;
    let end = nums.length - 1;
    let mid = 0;

    while(mid <= end){
        if(nums[mid] === 2){
            let temp = nums[mid];
            nums[mid] = nums[end];
            nums[end] = temp ;
            end--;  
        }

        else if(nums[mid] === 0) {
            let temp = nums[mid];
            nums[mid] = nums[start];
            nums[start] = temp ;
            start++ ;
            mid++ ;
        }

        else {
            mid++ ;
        }
        
    }
    return nums;
};