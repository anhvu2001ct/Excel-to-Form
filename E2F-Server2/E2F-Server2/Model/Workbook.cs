namespace E2F_Server2.Model
{
    public class Workbook
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string FileName { get; set; } = null!;
        public string? Description { get; set; }
        public string? Url { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
