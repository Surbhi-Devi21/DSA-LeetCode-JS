    
/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    const n = s.length;
    const chars = s.split("");

    const tree = Array.from({ length: 4 * n }, () => ({
        leftChar: "",
        rightChar: "",
        prefix: 0,
        suffix: 0,
        max: 0,
        length: 0
    }));

    function build(node, left, right) {
        if (left === right) {
            tree[node] = {
                leftChar: chars[left],
                rightChar: chars[left],
                prefix: 1,
                suffix: 1,
                max: 1,
                length: 1
            };
            return;
        }

        const mid = Math.floor((left + right) / 2);

        build(node * 2, left, mid);
        build(node * 2 + 1, mid + 1, right);

        merge(node);
    }

    function merge(node) {
        const leftNode = tree[node * 2];
        const rightNode = tree[node * 2 + 1];

        const current = tree[node];

        current.length = leftNode.length + rightNode.length;
        current.leftChar = leftNode.leftChar;
        current.rightChar = rightNode.rightChar;

        // Longest prefix
        current.prefix = leftNode.prefix;

        if (
            leftNode.prefix === leftNode.length &&
            leftNode.rightChar === rightNode.leftChar
        ) {
            current.prefix += rightNode.prefix;
        }

        // Longest suffix
        current.suffix = rightNode.suffix;

        if (
            rightNode.suffix === rightNode.length &&
            leftNode.rightChar === rightNode.leftChar
        ) {
            current.suffix += leftNode.suffix;
        }

        // Maximum repeating substring
        current.max = Math.max(
            leftNode.max,
            rightNode.max
        );

        if (leftNode.rightChar === rightNode.leftChar) {
            current.max = Math.max(
                current.max,
                leftNode.suffix + rightNode.prefix
            );
        }
    }

    function update(node, left, right, index, char) {
        if (left === right) {
            tree[node] = {
                leftChar: char,
                rightChar: char,
                prefix: 1,
                suffix: 1,
                max: 1,
                length: 1
            };

            return;
        }

        const mid = Math.floor((left + right) / 2);

        if (index <= mid) {
            update(node * 2, left, mid, index, char);
        } else {
            update(node * 2 + 1, mid + 1, right, index, char);
        }

        merge(node);
    }

    build(1, 0, n - 1);

    const answer = [];

    for (let i = 0; i < queryIndices.length; i++) {
        const index = queryIndices[i];
        const char = queryCharacters[i];

        chars[index] = char;

        update(1, 0, n - 1, index, char);

        answer.push(tree[1].max);
    }

    return answer;
};

