using Graphic_Neural_Network.backend.converters;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.ComponentModel.DataAnnotations;

namespace Graphic_Neural_Network.backend.Models
{
    public class PlotData
    {


        public int ElementCount { get; set; }
        public Tree Tree { get; set; }
        public Point[] Points { get; set; }
        private NumberGenerator _numberGenerator { get; set; }
        string[] _letters = { "A", "B", "C", "D", "E" };

        public PlotData()
        {
            ElementCount = 100;
            Points = new Point[ElementCount];
            Tree = new Tree();
            _numberGenerator = new NumberGenerator();
        }

        public JObject ToJson()
        {
            var jo = new JObject
            {
                ["elementCount"] = this.ElementCount,
                ["tree"] = this.Tree.ToJson(),
                ["points"] = JArray.FromObject(this.Points)
            };

            return jo;
        }

        public void SetSeed(int seed)
        {
            // check
            _numberGenerator.Seed = seed;
        }

        public void SetElementCount(int count)
        {
            if(count > 10)
            ElementCount = count;
        }

        public void AddNode(string key)
        {
            Tree.AddNode(key);
        }

        public void RemoveNode(string key)
        {
            Tree.RemoveNode(key);
        }


        public void Generate()
        {
            Points = new Point[ElementCount];
            int count = 0;
            for (int i = 0; i < ElementCount; i++)
            {
                Points[i] = new Point(i, _numberGenerator.genarate(-9.8, 9.8), _numberGenerator.genarate(-9.8, 9.8), 0);
            }
            

            foreach (Point p in Points)
            {
                bool find = true;
                TreeNode node = Tree.Root;
                while (find)
                {
                    if (node is EndTreeNode)
                    {
                        p.Class = Array.IndexOf(_letters, (node as EndTreeNode).Value);
                        find = false;
                    }
                    else
                    {
                        if ((node as MiddleTreeNode).Divider.Evaluate(p.X, p.Y))
                            node = (node as MiddleTreeNode).Next[node.Key + "0"];
                        else
                            node = (node as MiddleTreeNode).Next[node.Key + "1"];
                    }
                }
            }
        }

        


    }

   

}
