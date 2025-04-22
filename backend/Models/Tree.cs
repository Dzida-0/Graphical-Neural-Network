using Newtonsoft.Json.Linq;

namespace Graphic_Neural_Network.backend.Models
{
    public class Tree
    {
        public TreeNode Root { get; set; }
        public int EndNodeCount { get; set; }

        public Tree()
        {
            EndNodeCount = 2;
            Root = new MiddleTreeNode("0");
            ((MiddleTreeNode)Root).SetChild(new EndTreeNode("A", "00"));
            ((MiddleTreeNode)Root).SetChild(new EndTreeNode("B", "01"));
        }

        public virtual JObject ToJson()
        {
            var jo = new JObject();
            jo["EndNodeCount"] = this.EndNodeCount;
            jo["root"] = this.Root.ToJson();
            return jo;
        }

        public TreeNode GetNodeByKey(string key)
        {
            if (key == "0") return Root;

            TreeNode node = Root;

            for (int i = 1; i < key.Length; i++)
            {
                string nextKey = key.Substring(0, i + 1);
                if (node is not MiddleTreeNode middleNode || !middleNode.Next.ContainsKey(nextKey))
                    return null;

                node = middleNode.Next[nextKey];
            }

            return node;
        }

        public void AddNode(string key)
        {
            if (EndNodeCount == 5) return;

            TreeNode node = GetNodeByKey(key);
            if (node == null || node is not EndTreeNode endNode) return;

            TreeNode aboveNode = GetNodeByKey(key[..^1]);
            if (aboveNode is not MiddleTreeNode aboveMiddle) return;

            MiddleTreeNode newNode = new(key);
            newNode.SetChild(new EndTreeNode(endNode.Value, key + "0"));
            newNode.SetChild(new EndTreeNode("ABCDE"[EndNodeCount].ToString(), key + "1"));
            aboveMiddle.SetChild(newNode);

            EndNodeCount++;
        }

        public void RemoveNode(string key)
        {
            if (EndNodeCount == 2) return;

            TreeNode node = GetNodeByKey(key);
            if (node == null || node is MiddleTreeNode) return;

            string parentKey = key[..^1];
            TreeNode parentNode = GetNodeByKey(parentKey);
            if (parentNode is not MiddleTreeNode parentMiddle) return;

            parentMiddle.RemoveChild(node);

            string grandParentKey = key[..^2];
            TreeNode grandParent = GetNodeByKey(grandParentKey);
            if (grandParent is not MiddleTreeNode grandMiddle) return;

            string siblingKey = parentKey + "0";
            EndTreeNode sibling = GetNodeByKey(siblingKey) as EndTreeNode;
            if (sibling == null) return;

            grandMiddle.SetChild(new EndTreeNode(sibling.Value, parentKey));
            EndNodeCount--;
        }

        public void ChangeDivider(string key, DataDivider divider)
        {
            if (GetNodeByKey(key) is MiddleTreeNode middle)
                middle.SetDivider(divider);
        }

        public DataDivider GetDivider(string key)
        {
            return GetNodeByKey(key) is MiddleTreeNode middle ? middle.Divider : null;
        }
    }

}
