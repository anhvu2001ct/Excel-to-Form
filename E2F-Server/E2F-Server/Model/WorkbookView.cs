﻿namespace E2F_Server.Model
{
    public class WorkbookView
    {
        public class SimpleSheet
        {
            public string Name { get; set; } = null!;
            public List<SheetColumn> Columns { get; set; } = new();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Url { get; set; }
        public string CreatedAt { get; set; } = null!;
        public List<SimpleSheet> Sheets { get; set; } = new();
    }
}
