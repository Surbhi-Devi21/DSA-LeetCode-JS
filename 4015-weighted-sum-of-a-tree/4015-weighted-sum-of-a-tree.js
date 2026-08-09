/**
 * @param {number[]} parent
 * @param {number[]} nums
 * @return {number}
 */
var weightedSum = function(parent, nums) {
     const n = parent.length;

    // Build children list
    const children = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        children[parent[i]].push(i);
    }

    // depth[0] = 1 because root depth is 1
    const depth = new Array(n);
    depth[0] = 1;

    const queue = [0];
    let front = 0;
    let height = 1;

    // BFS to find depth of every node
    while (front < queue.length) {
        const node = queue[front++];

        for (const child of children[node]) {
            depth[child] = depth[node] + 1;

            height = Math.max(height, depth[child]);

            queue.push(child);
        }
    }

    // Calculate total weight
    let answer = 0;

    for (let i = 0; i < n; i++) {
        answer += nums[i] * (height - depth[i] + 1);
    }

    return answer;
};