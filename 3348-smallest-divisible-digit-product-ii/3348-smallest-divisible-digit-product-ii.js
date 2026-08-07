/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
     // t can only contain prime factors 2, 3, 5, 7
    let need = [0, 0, 0, 0];
    let x = t;

    const primes = [2, 3, 5, 7];

    for (let i = 0; i < 4; i++) {
        while (x % primes[i] === 0) {
            need[i]++;
            x /= primes[i];
        }
    }

    // Impossible if t has any other prime factor
    if (x !== 1) return "-1";

    /*
        factor[d] = number of factors of:
        2, 3, 5, 7
        contained in digit d
    */
    const factor = [
        [0, 0, 0, 0], // 0
        [0, 0, 0, 0], // 1
        [1, 0, 0, 0], // 2
        [0, 1, 0, 0], // 3
        [2, 0, 0, 0], // 4
        [0, 0, 1, 0], // 5
        [1, 1, 0, 0], // 6
        [0, 0, 0, 1], // 7
        [3, 0, 0, 0], // 8
        [0, 2, 0, 0]  // 9
    ];

    const A = need[0];
    const B = need[1];

    /*
        dp[a][b] = minimum number of digits needed
        to provide at least a factors of 2
        and b factors of 3.

        Factors 5 and 7 each need their own digit.
    */
    const INF = 1000;

    const dp = Array.from(
        { length: A + 1 },
        () => new Array(B + 1).fill(INF)
    );

    dp[0][0] = 0;

    for (let a = 0; a <= A; a++) {
        for (let b = 0; b <= B; b++) {
            if (dp[a][b] === INF) continue;

            for (let digit = 2; digit <= 9; digit++) {
                const na = Math.min(A, a + factor[digit][0]);
                const nb = Math.min(B, b + factor[digit][1]);

                dp[na][nb] = Math.min(
                    dp[na][nb],
                    dp[a][b] + 1
                );
            }
        }
    }

    // Minimum digits required for remaining factors
    function minDigits(r2, r3, r5, r7) {
        return r5 + r7 + dp[r2][r3];
    }

    function subtractFactors(rem, digit) {
        const f = factor[digit];

        return [
            Math.max(0, rem[0] - f[0]),
            Math.max(0, rem[1] - f[1]),
            Math.max(0, rem[2] - f[2]),
            Math.max(0, rem[3] - f[3])
        ];
    }

    /*
        Build the lexicographically smallest suffix
        of exactly 'length' digits satisfying rem.
    */
    function buildSuffix(length, rem) {
        let result = "";

        for (let pos = 0; pos < length; pos++) {
            const left = length - pos - 1;

            for (let digit = 1; digit <= 9; digit++) {
                const next = subtractFactors(rem, digit);

                if (
                    minDigits(
                        next[0],
                        next[1],
                        next[2],
                        next[3]
                    ) <= left
                ) {
                    result += digit;
                    rem = next;
                    break;
                }
            }
        }

        return result;
    }

    // Check whether num itself is a valid answer
    let rem = [...need];
    let zeroFound = false;

    for (const ch of num) {
        const digit = Number(ch);

        if (digit === 0) {
            zeroFound = true;
            break;
        }

        rem = subtractFactors(rem, digit);
    }

    if (!zeroFound && rem.every(v => v === 0)) {
        return num;
    }

    const n = num.length;

    /*
        prefix = factors contributed by num[0 ... i-1]
        while scanning possible pivot positions from right to left.
    */
    let prefix = [0, 0, 0, 0];
    let prefixZeros = 0;

    // Initially prefix contains the entire number.
    for (const ch of num) {
        const digit = Number(ch);

        if (digit === 0) {
            prefixZeros++;
        } else {
            const f = factor[digit];

            for (let j = 0; j < 4; j++) {
                prefix[j] += f[j];
            }
        }
    }

    /*
        Try to make the smallest same-length number >= num.

        We change one digit at position i to something larger,
        then make the remaining suffix as small as possible.
    */
    for (let i = n - 1; i >= 0; i--) {
        const current = Number(num[i]);

        // Remove num[i] from prefix.
        if (current === 0) {
            prefixZeros--;
        } else {
            const f = factor[current];

            for (let j = 0; j < 4; j++) {
                prefix[j] -= f[j];
            }
        }

        // Prefix must be zero-free.
        if (prefixZeros > 0) continue;

        // Need a digit strictly greater than current.
        for (let digit = current + 1; digit <= 9; digit++) {
            const f = factor[digit];

            const remaining = [
                Math.max(0, need[0] - prefix[0] - f[0]),
                Math.max(0, need[1] - prefix[1] - f[1]),
                Math.max(0, need[2] - prefix[2] - f[2]),
                Math.max(0, need[3] - prefix[3] - f[3])
            ];

            const suffixLength = n - i - 1;

            if (
                minDigits(
                    remaining[0],
                    remaining[1],
                    remaining[2],
                    remaining[3]
                ) <= suffixLength
            ) {
                return (
                    num.slice(0, i) +
                    String(digit) +
                    buildSuffix(suffixLength, remaining)
                );
            }
        }
    }

    /*
        No valid answer of the same length.

        The answer needs at least:
        - n + 1 digits to be greater than num
        - minimum number of digits required by t
    */
    const requiredLength = minDigits(
        need[0],
        need[1],
        need[2],
        need[3]
    );

    const length = Math.max(n + 1, requiredLength);

    if (length > 2 * 100000 + 50) {
        return "-1";
    }

    return buildSuffix(length, [...need]);
    
};