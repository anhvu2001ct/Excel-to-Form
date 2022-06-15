using E2F_Server2.Model;
using Microsoft.AspNetCore.StaticFiles;
using System.Text.Json;

namespace E2F_Server2.Utilities
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

        public static string ToJson(object data)
        {
            return JsonSerializer.Serialize(data);
        }

        private static string[] dataRootPath = null!;
        public static string GetDataPath(params string[] paths)
        {
            if (dataRootPath == null) dataRootPath = new string[] { Program.RootPath, "Data" };
            return Path.Combine(dataRootPath.Concat(paths).ToArray());
        }

        public static bool DataExists(params string[] paths)
        {
            return File.Exists(GetDataPath(paths));
        }

        public static void DeleteData(params string[] paths)
        {
            File.Delete(GetDataPath(paths));
        }

        public static async Task<string> Upload(IFormFile file)
        {
            var fileBytes = await ToBytes(file.OpenReadStream());
            var res = await Program.Imagekit.Folder("/E2F/").FileName(file.FileName).UploadAsync(fileBytes);
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

        public static string SubMax(string s, int length)
        {
            if (s.Length <= length) return s;
            return s[..length];
        }
    }
}
