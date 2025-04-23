using Graphic_Neural_Network.backend.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace Graphic_Neural_Network.backend.converters
{

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System;

    public class TreeNodeConverter : JsonConverter<TreeNode>
    {
        public override TreeNode ReadJson(JsonReader reader, Type objectType, TreeNode existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            return new MiddleTreeNode("0");
        }

        public override void WriteJson(JsonWriter writer, TreeNode value, JsonSerializer serializer)
        {
            // Check if the value is a null object (which can happen with abstract classes)
            if (value == null)
            {
                writer.WriteNull();
                return;
            }

            // Start writing the object to JSON
            writer.WriteStartObject();

            // Write the 'type' property to indicate the type of the object
            writer.WritePropertyName("type");
            writer.WriteValue(value.GetType().Name.ToLower());  // Serialize type as lowercase

            // Write the properties of the object (Key, Next, Value, etc.)
            writer.WritePropertyName("key");
            writer.WriteValue(value.Key);

            // Handle serialization of properties specific to each subclass
            if (value is MiddleTreeNode middleNode)
            {
                writer.WritePropertyName("next");
                serializer.Serialize(writer, middleNode.Next);
                writer.WritePropertyName("divider");
                serializer.Serialize(writer, middleNode.Divider);
            }
            else if (value is EndTreeNode endNode)
            {
                writer.WritePropertyName("value");
                writer.WriteValue(endNode.Value);
            }

            // End object
            writer.WriteEndObject();
        }
    }



}
