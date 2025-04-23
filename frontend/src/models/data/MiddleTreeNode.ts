import TreeNode from "./TreeNode"
import DataDivider from "./DataDivider";
import LinearDivider from "./LinearDivider";

export default class MiddleTreeNode extends TreeNode {
    next: Map<string, TreeNode>;
    divider: DataDivider;

    constructor(key: string) {
        super(key);
        this.next = new Map();
        this.divider = new LinearDivider();
    };

    setDivider(div: DataDivider) {
        this.divider = div;
    }

    setChild(child: TreeNode) {
        this.next.set(child.key, child);
    };

    removeChild(child: TreeNode) {
        this.next.delete(child.key);
    };
}