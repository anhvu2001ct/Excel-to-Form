namespace E2F_Server.Utilities
{
    public static class Constraint {
        public const int MAX_IMG_UPLOAD = 5000000;

        public const int MAX_EXCEL_UPLOAD = 50000000;

        public const string NANOID_ALLOWED_STR = "zqaxwscedvrfbtgyhnujmiklop_1234567890";

        public const short NANOID_LENGTH = 16;

        public static readonly string[] ACCEPT_EXT_IMG = {".jpg", ".jpeg", ".png", ".webp"};

        public static readonly string[] ACCEPT_EXT_SHEET = {".xlsx"};

        public const int UPPER_COLUMN_RANGE = 5000;

        public const string MAX_COLUMN_VALID = "OZZ";

        public static string GetExtErrorMsg(string[] ext)
        {
            return $"Only support file of types [{string.Join(", ", ext)}]";
        }

        public static string GetFileSizeErrorMsg(int maximum)
        {
            return $"File size exceeded {maximum / 1000000}Mb!";
        }
    }
}
