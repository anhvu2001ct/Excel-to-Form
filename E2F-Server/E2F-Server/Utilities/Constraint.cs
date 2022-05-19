namespace E2F_Server.Utilities
{
    public static class Constraint {
        public const int MAX_IMG_UPLOAD = 5000000;

        public const int MAX_UPLOAD = 25000000;

        public static readonly string[] ACCEPT_EXT_IMG = {".jpg", ".jpeg", ".png"};

        public static readonly string[] ACCEPT_EXT_SHEET = {".xls", ".xlsx"};

        public static string GetExtErrorMsg(string[] ext)
        {
            return $"Only support file of types [{string.Join(", ", ext)}]";
        }
    }
}
