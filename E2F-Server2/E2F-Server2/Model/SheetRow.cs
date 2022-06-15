namespace E2F_Server2.Model
{
    public class SheetRow
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<SheetField> Fields { get; set; } = new();
    }
}
