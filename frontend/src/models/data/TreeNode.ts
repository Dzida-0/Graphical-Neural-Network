
export default class TreeNode {
    next: TreeNode | null;
    value: number | null;

    constructor() {
        this.next = null;
        this.value = null;
    }

    removePrevEndNode() {
        if (this.value == null) return;
        this.value -= 1;
    }
}