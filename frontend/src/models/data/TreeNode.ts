import DataDivider from "./DataDivider";
import LinearDivider from "./LinearDivider";

export default class TreeNode {
    next: Map<string, TreeNode>;
    value: string | null;
    key: string;
    divider: DataDivider | null;
    amount: number | null;


    constructor(value: string | null, key: string ) {
        this.key = key;
        this.value = value;
        this.next = new Map();
        this.divider = new LinearDivider();
        this.amount = 0;
    };

    setChild(child: TreeNode) {
        this.next.set(child.key, child);
    };

    removeChild(child: TreeNode) {
        this.next.delete(child.key);
    };

};
