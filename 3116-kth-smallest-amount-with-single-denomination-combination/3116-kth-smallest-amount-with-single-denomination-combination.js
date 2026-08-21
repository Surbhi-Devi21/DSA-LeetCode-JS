/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
           
                       // Remove duplicate/redundant coins
    coins = [...new Set(coins)];

    // If a coin is divisible by a smaller coin,
    // its multiples are already covered.
    coins.sort((a, b) => a - b);

    const filtered = [];

    for (const c of coins) {
        let redundant = false;

        for (const x of filtered) {
            if (c % x === 0) {
                redundant = true;
                break;}

        }

        if (!redundant) {
            filtered.push(c);
        }
    }

    coins = filtered;

    const n = coins.length;

    function gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    function lcm(a, b) {
        return a / gcd(a, b) * b;
    }

    // Count how many distinct valid amounts <= x
    function count(x) {
        let total = 0;
               for (let mask = 1; mask < (1 << n); mask++) {

            let common = 1;
            let bits = 0;
            let valid = true;

            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    bits++;

                    common = lcm(common, coins[i]);

                    if (common > x) {
                        valid = false;
                        break;
                    }
                }
            }

            if (!valid) continue;

            const ways = Math.floor(x / common);

            if (bits % 2 === 1) {
                total += ways;
            } else {
                total -= ways;
            }
        }
           return total;
    }

    // Binary search
    let left = 1;
    let right = Math.min(...coins) * k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (count(mid) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};