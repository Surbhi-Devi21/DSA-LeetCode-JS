/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexGreaterPermutation = function(s, target) {
   const n = s.length;

    // Frequency of characters in s
    const freq = new Array(26).fill(0);

    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    // Match target prefix as much as possible
    let i = 0;

    while (i < n) {
        const c = target.charCodeAt(i) - 97;

        if (freq[c] === 0) {
            break;
        }

        freq[c]--;
        i++;
    }

    // Backtrack and try to make the string greater
    for (let pos = i; pos >= 0; pos--) {

        // If we already used target[pos],
        // put it back before trying another character.
        if (pos < i) {
            const c = target.charCodeAt(pos) - 97;
            freq[c]++;
        }

        const targetChar = target.charCodeAt(pos) - 97;

        // Find the smallest character greater than target[pos]
        for (let c = targetChar + 1; c < 26; c++) {

            if (freq[c] > 0) {

                // Use this character
                freq[c]--;

                let ans = target.substring(0, pos);
                ans += String.fromCharCode(c + 97);

                // Put remaining characters in smallest order
                for (let x = 0; x < 26; x++) {
                    while (freq[x] > 0) {
                        ans += String.fromCharCode(x + 97);
                        freq[x]--;
                    }
                }

                return ans;
            }
        }
    }

    return "";
    
};