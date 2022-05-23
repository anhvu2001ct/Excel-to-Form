namespace E2F_Server.Model
{
    public class WorkbookPreImport
    {
        public string SheetId { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Extension { get; set; }
        public List<SheetPreImport> Sheets { get; set; } = new();
    }
}
