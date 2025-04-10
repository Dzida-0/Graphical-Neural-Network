import DataDivider from "./DataDivider";
import EndTreeNode from "./EndTreeNode";
import MiddleTreeNode from "./MiddleTreeNode";
import TreeNode from "./TreeNode"

export default class Tree {
    root: TreeNode;
    endNodeCount: number;
    constructor() {
        this.endNodeCount = 2;
        this.root = new MiddleTreeNode("0");
        (this.root as MiddleTreeNode).setChild(new EndTreeNode("A","00"));
        (this.root as MiddleTreeNode).setChild(new EndTreeNode("B", "01"));
    };

    getNodeByKey(key: string) {
        if (key == "0") return this.root;

        let node = this.root;
        for (let i = 1; i < key.length; i++) {
            const nextKey = key.substring(0, i + 1);
            //if (node instanceof EndTreeNode) return null;
            if (!(node as MiddleTreeNode).next.has(nextKey)) return null;
            node = (node as MiddleTreeNode).next.get(nextKey)!; // ! - non-null assertion operator
        }
        return node;
    };

    addNode(key: string) {
   
        if (this.endNodeCount == 5) return;
        const node = this.getNodeByKey(key);
        if (node == null) return;
        if (node instanceof EndTreeNode) {
            const aboveNode = this.getNodeByKey(key.substring(0, key.length-1))!;
            const newNode = new MiddleTreeNode(key);
            newNode.setChild(new EndTreeNode((node as EndTreeNode).value, key + "0"));
            newNode.setChild(new EndTreeNode("ABCDE"[this.endNodeCount], key + "1"));
            (aboveNode as MiddleTreeNode).setChild(newNode);
            this.endNodeCount++;
        }

    };

    removeNode(key: string) {
        if (this.endNodeCount == 2) return;
        const node = this.getNodeByKey(key);
        if (node == null) return;
        if (node instanceof MiddleTreeNode) return;

        const aboveNode = this.getNodeByKey(key.substring(0, key.length - 1))!;
        (aboveNode as MiddleTreeNode).removeChild(this.getNodeByKey(key)!);
        const aboveAboveNode = this.getNodeByKey(key.substring(0, key.length - 2))!;
        (aboveAboveNode as MiddleTreeNode).setChild(new EndTreeNode((this.getNodeByKey(aboveNode + "0") as EndTreeNode)!.value, aboveNode.key))
        this.endNodeCount--;
    };

    changeDivider(key: string, divider: DataDivider) {
        (this.getNodeByKey(key) as MiddleTreeNode).divider = divider;
    }

}
