
export default class TreeNode {
    next: Map<string, TreeNode>;
    value: string | null;
    key: string;

    constructor(value: string | null, key: string ) {
        this.key = key;
        this.value = value;
        this.next = new Map();
    };

    setChild(child: TreeNode) {
        this.next.set(child.key, child);
    };

    removeChild(child: TreeNode) {
        this.next.delete(child.key);
    };

};