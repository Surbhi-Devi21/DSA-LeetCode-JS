/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  let low = 0 ; 
  let high = 0;
  let sum = 0 ;
  let result = Infinity ;

  while( high < nums.length) {
    sum += nums[high] ; 
  
    while( sum >= target){
        let len = high - low + 1;
        result = Math.min(result , len) ;
        sum -= nums[low] ;
        low++ ;
    }
  high++ ;
  }
  if (result === Infinity) {
    return 0;
}


  
  return result ;
};