namespace E2F_Server2.Model
{
    public class Sheet
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int HeaderStartRow { get; set; }
        public int HeaderEndRow { get; set; }
        public string HeaderStartCol { get; set; } = null!;
        public string HeaderEndCol { get; set; } = null!;
        public int SheetIndex { get; set; }
        public List<SheetColumn> Columns { get; set; } = new();
    }
}
