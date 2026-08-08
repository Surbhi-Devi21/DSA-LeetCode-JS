/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
     const n = word1.length;
    const m = word2.length;

    /*
        exact[j] = latest index from which word2[j...]
        can be matched exactly in word1.

        More precisely, it stores the latest possible
        position of the first character of that suffix.
    */
    const exact = new Array(m + 1).fill(-1);
    exact[m] = n;

    let p = n - 1;

    for (let j = m - 1; j >= 0; j--) {
        while (p >= 0 && word1[p] !== word2[j]) {
            p--;
        }

        if (p < 0) {
            exact[j] = -1;
        } else {
            exact[j] = p;
            p--;
        }
    }

    /*
        Store positions of every character.
        This lets us find the latest occurrence of
        a character before a given position.
    */
    const positions = Array.from({ length: 26 }, () => []);

    for (let i = 0; i < n; i++) {
        positions[word1.charCodeAt(i) - 97].push(i);
    }

    /*
        runStart[i] = starting index of the current
        same-character block.

        Used to quickly find the latest position
        having a DIFFERENT character.
    */
    const runStart = new Array(n);

    for (let i = 0; i < n; i++) {
        if (i === 0 || word1[i] !== word1[i - 1]) {
            runStart[i] = i;
        } else {
            runStart[i] = runStart[i - 1];
        }
    }

    /*
        one[j] = latest possible starting index for
        word2[j...] if we are allowed at most ONE mismatch.
    */
    const one = new Array(m + 1).fill(-1);
    one[m] = n;

    function lowerBound(arr, target) {
        let left = 0;
        let right = arr.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }

    for (let j = m - 1; j >= 0; j--) {

        /*
            OPTION 1:
            Match word2[j] exactly.

            Then the remaining suffix may contain
            the one allowed mismatch.
        */
        const boundary = one[j + 1];

        const arr = positions[word2.charCodeAt(j) - 97];

        const index = lowerBound(arr, boundary) - 1;

        let same = -1;

        if (index >= 0) {
            same = arr[index];
        }

        /*
            OPTION 2:
            Use the one mismatch at position j.

            Then everything after j must match exactly.
        */
        const exactBoundary = exact[j + 1];

        let different = -1;

        if (exactBoundary !== -1) {
            const q = exactBoundary - 1;

            if (q >= 0) {
                if (word1[q] !== word2[j]) {
                    different = q;
                } else {
                    different = runStart[q] - 1;
                }
            }
        }

        one[j] = Math.max(same, different);
    }

    /*
        Now construct the lexicographically smallest
        index sequence.

        We scan word1 from left to right, so the first
        valid index we find is always the smallest possible.
    */
    const answer = [];

    let previous = -1;
    let mismatchUsed = false;

    for (let j = 0; j < m; j++) {

        let found = false;

        for (let i = previous + 1; i < n; i++) {

            const isSame = word1[i] === word2[j];

            let possible = false;

            if (isSame) {

                if (!mismatchUsed) {
                    // We can still use mismatch later.
                    possible =
                        (j === m - 1) ||
                        (one[j + 1] > i);
                } else {
                    // Mismatch already used, so rest must match exactly.
                    possible =
                        (j === m - 1) ||
                        (exact[j + 1] > i);
                }

            } else {

                // This character consumes our one mismatch.
                if (!mismatchUsed) {
                    possible =
                        (j === m - 1) ||
                        (exact[j + 1] > i);
                }
            }

            if (possible) {
                answer.push(i);
                previous = i;

                if (!isSame) {
                    mismatchUsed = true;
                }

                found = true;
                break;
            }
        }

        if (!found) {
            return [];
        }
    }

    return answer;
    
};