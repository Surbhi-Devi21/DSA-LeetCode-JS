/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
      let prev = head;
    let curr = head.next;

    let index = 1;

    let first = -1;
    let last = -1;
    let minDist = Infinity;

    while (curr !== null && curr.next !== null) {
        let next = curr.next;

        // Local maximum
        let isMax = curr.val > prev.val && curr.val > next.val;

        // Local minimum
        let isMin = curr.val < prev.val && curr.val < next.val;

        if (isMax || isMin) {

            // First critical point
            if (first === -1) {
                first = index;
            } 
            else {
                // Distance from previous critical point
                minDist = Math.min(minDist, index - last);
            }

            // Current becomes the latest critical point
            last = index;
        }

        prev = curr;
        curr = next;
        index++;
    }

    // Less than 2 critical points
    if (first === -1 || first === last) {
        return [-1, -1];
    }

    return [minDist, last - first];
    
};