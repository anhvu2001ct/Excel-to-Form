namespace E2F_Server.Model
{
    public class Workbook
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public List<Sheet> Sheets { get; set; } = new();
    }
}
