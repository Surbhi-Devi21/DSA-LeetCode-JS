/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  nums.sort((a,b) => a - b);
  let max_diff = Infinity ;
   let closest = null ;
  for( let i = 0 ; i < nums.length - 2 ; i++){
    let left = i + 1;
    let right = nums.length - 1;
    
    while(left < right){
        let sum = nums[i] + nums[left]+ nums[right];
       
        let diff = Math.abs( sum - target) ;
        if(diff < max_diff) {
        max_diff = diff ; 
         closest = sum ;
               
        }
        else {
            if ( sum === target){
                return sum
            }

            else if ( sum > target){
                right-- ;
            }
            else {
                left++ ;
            }
        }
    }
    
  }

  return closest ;

};