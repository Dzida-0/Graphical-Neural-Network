import TreeNode from "./TreeNode"

export default class Tree {
    root: TreeNode;
    endNodeCount: number;
    constructor() {
        this.endNodeCount = 0;
        this.root = new TreeNode(null,"0");
        this.addNode("0");
        this.addNode("0");
    };

    getNodeByKey(key: string) {
        if (key == "0") return this.root;

        let node = this.root;
        for (let i = 1; i < key.length; i++) {
            const nextKey = key.substring(0, i + 1);
            if (!node.next.has(nextKey)) return null;
            node = node.next.get(nextKey)!; // ! - non-null assertion operator
        }
        return node;
    };

    addNode(key: string) {
   
        if (this.endNodeCount == 5) return;
        const node = this.getNodeByKey(key);
        if (node == null) return;
        if (node.value != null) {
            const aboveNode = this.getNodeByKey(key.substring(0, key.length-1))!;
            const newNode = new TreeNode(null, key);
            newNode.setChild(new TreeNode(node.value, key + "0"));
            newNode.setChild(new TreeNode("ABCDE"[this.endNodeCount], key + "1"));
            aboveNode.setChild(newNode);


        }
        else {
            const newKey = key + node.next.size;
            const newNode = new TreeNode("ABCDE"[this.endNodeCount], newKey);
            
            node.setChild(newNode);

        
        }
    
        this.endNodeCount++;
    };

    removeNode(key: string) {
        if (this.endNodeCount == 2) return;
        const node = this.getNodeByKey(key);
        if (node == null) return;
        if (node.value == null) return;

        const aboveNode = this.getNodeByKey(key.substring(0, key.length - 1))!;
        aboveNode.removeChild(this.getNodeByKey(key)!);
        if (aboveNode.next.size == 1) {
            const aboveAboveNode = this.getNodeByKey(key.substring(0, key.length - 2))!;
            aboveAboveNode.setChild(new TreeNode(this.getNodeByKey(aboveNode+"0")!.value,aboveNode.key))
        }
        this.endNodeCount--;
    };

    moveNode(from: string, to: string){
        const nodeFrom = this.getNodeByKey(from);
        if (nodeFrom == null) return;
        const nodeTo = this.getNodeByKey(to);
        if (nodeTo == null) return;
    };
}
