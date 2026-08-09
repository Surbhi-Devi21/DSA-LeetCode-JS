/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;

    // suffix[i] = sum of piles from i to end
    const suffix = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + piles[i];
    }

    // dp[i][M] = maximum stones current player can get
    // starting from index i with current M
    const dp = Array.from(
        { length: n },
        () => new Array(n + 1).fill(-1)
    );

    function solve(i, M) {
        // Can take all remaining piles
        if (i >= n) {
            return 0;
        }

        if (2 * M >= n - i) {
            return suffix[i];
        }

        if (dp[i][M] !== -1) {
            return dp[i][M];
        }

        let best = 0;

        // Try taking X piles, where 1 <= X <= 2M
        for (let X = 1; X <= 2 * M && i + X <= n; X++) {
            // Current player gets the total remaining stones
            // minus what the opponent can optimally get.
            const opponent = solve(
                i + X,
                Math.max(M, X)
            );

            const current = suffix[i] - opponent;

            best = Math.max(best, current);
        }

        dp[i][M] = best;
        return best;
    }

    return solve(0, 1);

};