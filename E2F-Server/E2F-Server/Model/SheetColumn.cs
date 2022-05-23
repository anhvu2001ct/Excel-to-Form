namespace E2F_Server.Model
{
    public class SheetColumn
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
        public object? Additional { get; set; }
    }
}
