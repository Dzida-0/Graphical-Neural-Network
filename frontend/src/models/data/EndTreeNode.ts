import TreeNode from "./TreeNode"

export default class EndTreeNode extends TreeNode {
    value: string;
    amount: number;

    constructor(value: string, key: string) {
        super(key);
        this.value = value;
        this.amount = 100;
    };

    setValue(newVal: string) {
        this.value = newVal;
    }

    setAmount(newAmount: number) {
        this.amount = newAmount;
    }
}