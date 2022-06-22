namespace E2F_Server2.Model.Helper
{
    public class SheetSearchSortQuery
    {
        public int ColumnId { get; set; }
        public string Order { get; set; } = "asc";
    }

    public class SheetSearchQuery
    {
        public SheetSearchSortQuery? Sorting { get; set; }
        public Dictionary<int, string?> SearchPatterns { get; set; } = null!;
    }
}
