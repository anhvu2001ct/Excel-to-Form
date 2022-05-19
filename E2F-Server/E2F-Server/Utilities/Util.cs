using System.Text.Json;

namespace E2F_Server.Utilities
{
    public static class Util
    {
        private static JsonSerializerOptions _options = new()
        {
            PropertyNameCaseInsensitive = true
        };
        public static T GetObject<T>(this JsonElement json)
        {
            return json.Deserialize<T>(_options)!;
        }

        public static bool DataExists(string name)
        {
            return File.Exists(Path.Combine(Program.RootPath, "Data", name));
        }

        public static async Task WriteData(string path, object value)
        {
            path = Path.Combine(Program.RootPath, "Data", path);
            using (var file = File.Create(path))
            {
                await JsonSerializer.SerializeAsync(file, value);
            }
        }

        public static void DeleteData(string path)
        {
            path = Path.Combine(Program.RootPath, "Data", path);
            File.Delete(path);
        }

        public static async Task<string> Upload(IFormFile file)
        {
            var fileBytes = await ToBytes(file.OpenReadStream());
            var res = await Program.Imagekit.Folder("/E2Form/").FileName(file.FileName).UploadAsync(fileBytes);
            return res.URL;
        }

        public static async Task<string> Upload(string path, string name)
        {
            path = Path.Combine(Program.RootPath, "Data", path);
            using (var file = File.OpenRead(path))
            {
                var fileBytes = await ToBytes(file);
                var res = await Program.Imagekit.Folder("/E2Form/").FileName(name).UploadAsync(fileBytes);
                return res.URL;
            }
        }

        public static bool IsExtAccepted(string fileName, string[] acceptedExt)
        {
            string extension = Path.GetExtension(fileName).ToLower();
            return acceptedExt.Contains(extension);
        }

        public static async Task<byte[]> ToBytes(Stream instream)
        {
            if (instream is MemoryStream)
                return ((MemoryStream)instream).ToArray();

            using (var memoryStream = new MemoryStream())
            {
                await instream.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }

    }
}
