namespace E2F_Server.Model
{
    public class WorkbookView
    {
        public class SimpleSheet
        {
            public string Name { get; set; } = null!;
            public List<SheetColumn> Columns { get; set; } = new();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public List<SimpleSheet> Sheets { get; set; } = new();
    }
}
