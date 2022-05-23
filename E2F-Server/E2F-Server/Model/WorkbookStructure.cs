namespace E2F_Server.Model
{
    public class WorkbookStructure
    {
        public List<string> Order { get; set; } = new();
        public Dictionary<string, Sheet> Sheets { get; set; } = new();
    }
}
