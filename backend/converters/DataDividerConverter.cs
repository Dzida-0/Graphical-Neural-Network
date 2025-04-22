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


    public class DataDividerConverter : JsonConverter<DataDivider>
    {
        public override DataDivider ReadJson(JsonReader reader, Type objectType, DataDivider existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            return new LinearDivider();
        }

        public override void WriteJson(JsonWriter writer, DataDivider value, JsonSerializer serializer)
        {
         
            // Start writing the object to JSON
            writer.WriteStartObject();

            // Write the 'type' property to indicate the type of the object
            writer.WritePropertyName("type");
            writer.WriteValue(value.GetType().Name);  // Serialize type as lowercase

            // Write the properties of the object (Key, Next, Value, etc.)

            // Handle serialization of properties specific to each subclass
            if (value is SquaredDivider divider)
            {
                writer.WritePropertyName("width");
                serializer.Serialize(writer, divider.Width);
            }
          
            // End object
            writer.WriteEndObject();
        }
    }


}
