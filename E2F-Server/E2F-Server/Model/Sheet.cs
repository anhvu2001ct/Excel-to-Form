namespace E2F_Server.Model
{
    public class Sheet
    {
        public string Name { get; set; } = null!;
        public int RowIndex { get; set; }
        public string? ColumnStart { get; set; }
        public string? ColumnEnd { get; set; }
        public List<string> Fields { get; set; } = new();
    }
}
