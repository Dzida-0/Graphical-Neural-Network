import TreeNode from "./TreeNode"

export default class EndTreeNode extends TreeNode {
    value: string;

    constructor(value: string, key: string) {
        super(key);
        this.value = value;
    };

    setValue(newVal: string) {
        this.value = newVal;
    }
}