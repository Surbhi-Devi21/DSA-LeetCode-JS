/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function(s) {
    
 const freq = new Array(26).fill(0);

    let left = 0;
    let answer = 0;

    for (let right = 0; right < s.length; right++) {
        const r = s.charCodeAt(right) - 97;
        freq[r]++;

        while (freq[r] > 2) {
            const l = s.charCodeAt(left) - 97;
            freq[l]--;
            left++;
        }

        answer = Math.max(answer, right - left + 1);
    }

    return answer;

};