using E2F_Server.Model;
using Microsoft.AspNetCore.StaticFiles;
using System.Text.Json;

namespace E2F_Server.Utilities
{
    public static class Util
    {
        private static JsonSerializerOptions jsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public static T GetObject<T>(this JsonElement json)
        {
            return json.Deserialize<T>(jsonOptions)!;
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
                await JsonSerializer.SerializeAsync(file, value, jsonOptions);
            }
        }

        public static void DeleteData(string path)
        {
            path = Path.Combine(Program.RootPath, "Data", path);
            File.Delete(path);
        }

        public static async Task<T?> ReadData<T>(string path)
        {
            path = Path.Combine(Program.RootPath, "Data", path);
            using (var file = File.OpenRead(path))
            {
                var data = await JsonSerializer.DeserializeAsync<T>(file, jsonOptions);
                return data;
            }
        }

        public static async Task<string> Upload(IFormFile file)
        {
            var fileBytes = await ToBytes(file.OpenReadStream());
            var res = await Program.Imagekit.Folder("/E2Form/").FileName(file.FileName).UploadAsync(fileBytes);
            return res.URL;
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

        private static FileExtensionContentTypeProvider mimeData = new();
        public static string GetContentType(string? filePath)
        {
            if (string.IsNullOrEmpty(filePath)) return "application/octet-stream";
            if (!mimeData.TryGetContentType(filePath, out string? res)) res = "application/octet-stream";
            return res;
        }
    }
}
