/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let k = 1 ;
    let i = 0 ;
    let j = 1 ;

    while ( j < nums.length) {
      if (nums[j] == nums[j - 1]) {
        j++ ;
        
      }
      else {
        nums[i + 1] = nums[j] 
        i++ ;
        j++ ;
        k++;
      }
            
    }

    return k;

};