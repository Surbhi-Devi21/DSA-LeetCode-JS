/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const rows = new Map();

    // Store reserved seats as bitmasks for each row
    for (const [row, seat] of reservedSeats) {
        rows.set(row, (rows.get(row) || 0) | (1 << seat));
    }

    // Rows with no reserved seats can fit 2 groups each
    let answer = (n - rows.size) * 2;

    // Seat masks
    const left = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5);
    const middle = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);
    const right = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9);

    for (const mask of rows.values()) {
        const leftFree = (mask & left) === 0;
        const rightFree = (mask & right) === 0;
        const middleFree = (mask & middle) === 0;

        if (leftFree && rightFree) {
            answer += 2;
        } else if (leftFree || rightFree || middleFree) {
            answer += 1;
        }
        }

    return answer;
};