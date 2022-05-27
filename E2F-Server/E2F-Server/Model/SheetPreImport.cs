namespace E2F_Server.Model
{
    public class SheetPreImport
    {
        public string Name { get; set; } = null!;
        public int SheetIndex { get; set; }
        public bool Valid { get; set; } = false;
        public SheetCord Cord { get; set; } = new();
        public List<string> Fields { get; set; } = new();
    }
}
