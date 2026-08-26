/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var shortestBeautifulSubstring = function(s, k) {
    let left = 0;
    let ones = 0;

    let minLen = Infinity;
    let answer = "";

    for (let right = 0; right < s.length; right++) {
        if (s[right] === '1') {
            ones++;
        }

        // More than k ones -> shrink
        while (ones > k) {
            if (s[left] === '1') {
                ones--;
            }
            left++;
        }

        // Exactly k ones
        if (ones === k) {

            // Remove unnecessary leading zeroes
            while (s[left] === '0') {
                left++;
            }

            const len = right - left + 1;
            const current = s.slice(left, right + 1);

            if (
                len < minLen ||
                (len === minLen && current < answer)
            ) {
                minLen = len;
                answer = current;
            }
        }
    }

    return answer;
};