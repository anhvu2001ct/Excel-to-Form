namespace E2F_Server2.Model
{
    public class WorkbookImport
    {
        public Workbook Workbook { get; set; } = null!;
        public List<SheetImport> Sheets { get; set; } = new();
    }
}
