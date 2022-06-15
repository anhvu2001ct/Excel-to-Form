namespace E2F_Server2.Model
{
    public class SheetColumn
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string ColumnType { get; set; } = null!;
        public bool IsRequired { get; set; }
        public int ColumnIndex { get; set; }
        public List<string>? SelectOptions { get; set; }
    }
}
